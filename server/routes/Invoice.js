const express = require("express");
const router = express.Router();
const {
  Invoice,
  Invoice_Product,
  Product,
  Sale_of_Refund,
} = require("../models");
const { Op } = require('sequelize');

//get invoice list /api/getInvoiceList
router.get("/", async (req, res) => {
  const invoiceList = await Invoice.findAll();
  res.send(invoiceList);
});

//create invoice and return invoice id /api/createInvoice/
router.post("/api/createInvoice/", async (req, res) => {
  try {
    const newInvoice = await Invoice.create({
      user_id: 1,
    });
    res.send({ invoice_id: newInvoice.invoice_id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating invoice");
  }
});

router.post("/api/setTotalDiscount/", async (req, res) => {
  const { discount } = req.body;
  const { invoice_id } = req.body;
  try {
    const invoice = await Invoice.findByPk(invoice_id);
    if (!invoice) {
      res.status(404).send("Invoice not found");
      return;
    }
    await invoice.update({ discount: discount });
    const totalDiscountValue = invoice.total * (discount / 100);
    const formattedTotalDiscountValue = Number(totalDiscountValue.toFixed(3));
    res.send({
      message: "Discount has been updated successfully.",
      totalDiscountValue: formattedTotalDiscountValue,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//get invoice products for refund using sale ID
router.get("/api/getInvoice", async (req, res) => {
  const invoice_id = req.query.invoice_id;
  Invoice_Product.findAll({
    where: {
      invoice_id: invoice_id,
    },
    include: [
      {
        model: Product,
        attributes: ["product_name"],
      },
    ],
  })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send("An error occurred while retrieving invoice products.");
    });
});
//----------------------------------------------
//get sale invoice for refund using sale ID
router.get("/api/getInvoiceDetail", async (req, res) => {
  const invoice_id = req.query.invoice_id;
  const currentInvoice = req.query.currentInvoice;

  try {
    const InvoiceDetail = await Invoice.findOne({
      where: {
        invoice_id: invoice_id,
      },
    });
    if (!InvoiceDetail) {
      return res.status(404).send("Invoice not found.");
    }
    const discount = InvoiceDetail.discount;

    //check if a refund is already made for the same sale_id
    const refundMade = await Sale_of_Refund.findOne({
      where: {
        sale_id: invoice_id,
        refund_id: {
          [Op.not]: currentInvoice
        }
      }
    });
    if (refundMade) {
      return res.json({ status: 400});
    }
    // Check if a record already exists in Sale_of_Refund for the currentInvoice
    const existingRecord = await Sale_of_Refund.findOne({
      where: {
        refund_id: currentInvoice,
      },
    });

    if (existingRecord) {
      // Update the sale_id with the new invoice_id
      await Sale_of_Refund.update(
        { sale_id: invoice_id },
        {
          where: {
            refund_id: currentInvoice,
          },
        }
      );
    } else {
      // Create a new record in Sale_of_Refund
      await Sale_of_Refund.create({
        refund_id: currentInvoice,
        sale_id: invoice_id,
      });
    }

    // Update the discount column in the invoice table for the current invoice
    await Invoice.update(
      { discount: discount },
      {
        where: {
          invoice_id: currentInvoice,
        },
      }
    );
    res.json(InvoiceDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while retrieving the invoice.");
  }
});

module.exports = router;
