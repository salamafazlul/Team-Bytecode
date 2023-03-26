const express = require("express");
const router = express.Router();
const { Invoice_Product, Product, Invoice, Discount, sequelize } = require("../models");
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
  const {
    iid: invoice_id,
    pid: product_id,
    quantity,
    price,
  } = req.body;

  try {
     // Find the invoice for the given invoice ID
    const invoice = await Invoice.findByPk(invoice_id);

    if (!invoice) {
      return res.status(404).send('Invoice not found');
    }
     // Find the discount for the given product ID
     const discount = await Discount.findOne({ where: { product_id } });
   
 // Calculate the discount amount
 const discountAmount = discount ? discount.rate * (price * quantity) : 0;

  
    // Calculate the new total amount
    const newTotal = parseFloat(invoice.total) + price * quantity - discountAmount;


    await Invoice_Product.create({
      invoice_id,
      product_id,
      quantity,
      price: price,
      amount: price * quantity - discountAmount,
      discount:discountAmount,
    });

    await invoice.update({ total: newTotal });

    res.send("Product has been added to invoice successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
