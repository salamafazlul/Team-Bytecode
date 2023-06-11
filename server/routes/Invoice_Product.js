const express = require("express");
const router = express.Router();
const {
  Invoice_Product,
  Product,
  Invoice,
  Discount,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

router.get("/api/getInvoiceList", async (req, res) => {
  try {
    const invoice_id = req.query.invoice_id;
    const invoiceProducts = await Invoice_Product.findAll({
      where: { invoice_id },
      include: [
        { model: Product, attributes: ["product_name", "selling_price"] },
      ],
    });

    // Transform the data using map
    const transformedData = invoiceProducts.map((invoiceProduct) => {
      const { product_name, selling_price } = invoiceProduct.Product;
      return {
        id: invoiceProduct.id,
        invoice_id: invoiceProduct.invoice_id,
        product_id: invoiceProduct.product_id,
        quantity: invoiceProduct.quantity,
        price: invoiceProduct.price,
        discount: invoiceProduct.discount,
        amount: invoiceProduct.amount,
        product_name,
        selling_price,
      };
    });

    res.send(transformedData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/api/getTotal", async (req, res) => {
  const invoice_id = req.query.invoice_id;
  try {
    const result = await Invoice_Product.findOne({
      attributes: [[sequelize.fn("sum", sequelize.col("amount")), "total"]],
      where: {
        invoice_id: {
          [Op.eq]: invoice_id,
        },
      },
    });

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post("/api/addToInvoice/", async (req, res) => {
  const { iid: invoice_id, pid: product_id, quantity, price } = req.body;

  try {
    // Find the invoice for the given invoice ID
    const invoice = await Invoice.findByPk(invoice_id);

    if (!invoice) {
      return res.status(404).send("Invoice not found");
    }
    // Find the discount for the given product ID
    const discount = await Discount.findOne({ where: { product_id } });

    // Calculate the discount amount
    const discountAmount = discount
      ? (discount.rate / 100) * (price * quantity)
      : 0;

    // Calculate the new total amount
    const newTotal =
      parseFloat(invoice.total) + price * quantity - discountAmount;

    // Reduce the quantity in the Product table
    const product = await Product.findByPk(product_id);
    const newQuantity = product.stock - quantity;
    await product.update({ stock: newQuantity });

    await Invoice_Product.create({
      invoice_id,
      product_id,
      quantity,
      price: price,
      amount: price * quantity - discountAmount,
      discount: discount ? discount.rate : 0,
    });

    await invoice.update({ total: newTotal });

    res.send("Product has been added to invoice successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post("/api/updateQuantity/", async (req, res) => {
  const { product_id, invoice_id, quantity, amount, oldQuantity } = req.body;
  // Calculate the quantity difference
  const quantityDifference = quantity - oldQuantity;
  // Update the invoice product table with new quantity and amount
  await Invoice_Product.update(
    { quantity: parseInt(quantity), amount: parseFloat(amount) },
    {
      where: {
        product_id: parseInt(product_id),
        invoice_id: parseInt(invoice_id),
      },
    }
  );
  // Calculate the total amount for the particular invoice_id
  const invoiceTotal = await Invoice_Product.sum("amount", {
    where: { invoice_id: parseInt(invoice_id) },
  });
  // Update the total column in the Invoice table
  await Invoice.update(
    { total: invoiceTotal },
    {
      where: {
        invoice_id: parseInt(invoice_id),
      },
    }
  );
  // Update the stock column in the Product table
  const product = await Product.findByPk(product_id);
  const newStock = product.stock - quantityDifference;
  await product.update({ stock: newStock });
  res.send("Invoice updated successfully");
});

// remove product from invoice product table and update the stock during checkout
router.post("/api/removeProduct/", async (req, res) => {
  const invoice_id = req.body.invoice_id;
  const product_id = req.body.product_id;
  try {
    const invoiceProduct = await Invoice_Product.findOne({
      where: {
        invoice_id: invoice_id,
        product_id: product_id,
      },
    });
    if (!invoiceProduct) {
      return res.status(404).json({ error: "Product not found in Invoice" });
    }
    const amount = invoiceProduct.amount;
    const invoice = await Invoice.findByPk(invoice_id);
    if (invoice) {
      invoice.total -= amount;
      await invoice.save();
    }
    const quantity = invoiceProduct.quantity;
    const product = await Product.findByPk(product_id);
    if (product) {
      product.stock += quantity;
      await product.save();
    }
    await invoiceProduct.destroy();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/api/deleteRecords/:invoice_id", async (req, res) => {
  const { invoice_id } = req.params;
  try {
    // Fetch the records from Invoice_Product table for the given invoice ID
    const invoiceProducts = await Invoice_Product.findAll({
      where: { invoice_id: parseInt(invoice_id) },
    });
    // Update the stock column in the Product table for each product
    for (const invoiceProduct of invoiceProducts) {
      const { product_id, quantity } = invoiceProduct;
      const product = await Product.findByPk(product_id);
      const newStock = product.stock + quantity;
      await product.update({ stock: newStock });
    }
    // Delete records from Invoice_Product table
    await Invoice_Product.destroy({
      where: { invoice_id: parseInt(invoice_id) },
    });
    // Delete record from Invoice table
    await Invoice.destroy({
      where: { invoice_id: parseInt(invoice_id) },
    });
    // Set the auto-increment value to the deleted invoice ID
    const query = `ALTER TABLE Invoice AUTO_INCREMENT = ${parseInt(invoice_id)}`;
    await sequelize.query(query);
    res.send("Product has been deleted from the invoice successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//------------------------------------------------------------------------------------------------------
//refund section
router.get("/api/getInvoice", async (req, res) => {});

router.post("/api/addToRefund/", async (req, res) => {
  const { iid: invoice_id, pid: product_id, quantity, price, discount, amount } = req.body;
  try {
    // Find the invoice for the given invoice ID
    const invoice = await Invoice.findByPk(invoice_id);
    if (!invoice) {
      return res.status(404).send("Invoice not found");
    }
    // Calculate the new total amount
    const newTotal =
      parseFloat(invoice.total) + parseFloat(amount);
    // Reduce the quantity in the Product table
    const product = await Product.findByPk(product_id);
    const newQuantity = product.stock + quantity;
    await product.update({ stock: newQuantity });
    await Invoice_Product.create({
      invoice_id,
      product_id,
      quantity,
      price: price,
      amount: amount,
      discount: discount ? discount : 0,
    });
    await invoice.update({ total: newTotal });
    res.send("Refund Product has been added to invoice successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Refund Product has not been added to invoice!!");
  }
});

router.post("/api/updateRefundQuantity/", async (req, res) => {
  const { product_id, invoice_id, quantity, amount, oldQuantity } = req.body;
  // Calculate the quantity difference
  const quantityDifference = quantity - oldQuantity ;
  // Update the invoice product table with new quantity and amount
  await Invoice_Product.update(
    { quantity: parseInt(quantity), amount: parseFloat(amount) },
    {
      where: {
        product_id: parseInt(product_id),
        invoice_id: parseInt(invoice_id),
      },
    }
  );
  // Calculate the total amount for the particular invoice_id
  const invoiceTotal = await Invoice_Product.sum("amount", {
    where: { invoice_id: parseInt(invoice_id) },
  });
  // Update the total column in the Invoice table
  await Invoice.update(
    { total: invoiceTotal },
    {
      where: {
        invoice_id: parseInt(invoice_id),
      },
    }
  );
  // Update the stock column in the Product table
  const product = await Product.findByPk(product_id);
  const newStock = product.stock + quantityDifference;
  await product.update({ stock: newStock });
  res.send("Invoice updated successfully");
});


router.delete("/api/deleteRefundRecords/:invoice_id", async (req, res) => {
  const { invoice_id } = req.params;
  try {
    // Fetch the records from Invoice_Product table for the given invoice ID
    const invoiceProducts = await Invoice_Product.findAll({
      where: { invoice_id: parseInt(invoice_id) },
    });
    // Update the stock column in the Product table for each product
    for (const invoiceProduct of invoiceProducts) {
      const { product_id, quantity } = invoiceProduct;
      const product = await Product.findByPk(product_id);
      const newStock = product.stock - quantity;
      await product.update({ stock: newStock });
    }
    // Delete records from Invoice_Product table
    await Invoice_Product.destroy({
      where: { invoice_id: parseInt(invoice_id) },
    });
    // Delete record from Invoice table
    await Invoice.destroy({
      where: { invoice_id: parseInt(invoice_id) },
    });
    // Set the auto-increment value to the deleted invoice ID
    const query = `ALTER TABLE Invoice AUTO_INCREMENT = ${parseInt(invoice_id)}`;
    await sequelize.query(query);
    res.send("Product has been deleted from the invoice successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
// remove product from invoice product table and update the stock during refund
router.post("/api/removeRefundProduct/", async (req, res) => {
  const invoice_id = req.body.invoice_id;
  const product_id = req.body.product_id;
  try {
    const invoiceProduct = await Invoice_Product.findOne({
      where: {
        invoice_id: invoice_id,
        product_id: product_id,
      },
    });
    if (!invoiceProduct) {
      return res.status(404).json({ error: "Product not found in Invoice" });
    }
    const amount = invoiceProduct.amount;
    const invoice = await Invoice.findByPk(invoice_id);
    if (invoice) {
      invoice.total -= amount;
      await invoice.save();
    }
    const quantity = invoiceProduct.quantity;
    const product = await Product.findByPk(product_id);
    if (product) {
      product.stock -= quantity;
      await product.save();
    }
    await invoiceProduct.destroy();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
