const express = require("express");
const router = express.Router();
const { Invoice } = require("../models");

//get invoice list /api/getInvoiceList
router.get("/", async (req, res) => {
  const invoiceList = await Invoice.findAll();
  res.send(invoiceList);
});

//create invoice and return invoice id /api/createInvoice/
router.post("/api/createInvoice/", async (req, res) => {
    try {
        const newInvoice = await Invoice.create({
          user_id: 1
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
  
      await invoice.update({ discount: discount / 100 });
      res.send("Discount has been updated successfully.");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
