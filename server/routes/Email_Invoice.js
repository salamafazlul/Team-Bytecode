const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const { Invoice_Product, Product, Invoice, sequelize } = require("../models");

router.post("/api/generatePdf", async (req, res) => {
  const { email, invoice_id } = req.body;
  try {
    // find the invoice with the given invoice_id and its associated invoice products
    const invoiceProduct = await Invoice_Product.findAll({
      where: { invoice_id },
      include: [
        { model: Product, attributes: ["product_name"] },
      ],
    });

    if (!invoiceProduct) {
      return res.status(404).send("Invoice not found");
    }

    // create a new PDF document
    const doc = new PDFDocument();

    // pipe the PDF document to a buffer
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);

      // create a nodemailer transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "salama.fhf@gmail.com",
          pass: "azdrrhkyhqrgcfej",
        },
      });

      // create the email message
      const message = {
        from: "salama.fhf@gmail.com",
        to: email,
        subject: "ByTech POS Invoice",
        attachments: [
          {
            filename: `invoice-${invoice_id}.pdf`,
            content: pdfData,
            contentType: "application/pdf",
          },
        ],
      };

      // send the email
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send("Failed to send invoice");
        } else {
          console.log("Invoice sent successfully");
          res.status(200).send("Invoice sent successfully");
        }
      });
    });

    // add some content to the PDF document
    doc.fontSize(25).text("BY TECH POS", { align: "center" });
    doc.fontSize(16).text(`Invoice ${invoice_id}`, { align: "center" });
   

    // add the invoice details to the PDF document
    doc.moveDown();
    // doc.fontSize(16).text(`Date: ${invoice.date.toLocaleDateString()}`);
    // doc.fontSize(16).text(`Total: ${invoice.total}`);

    doc.moveDown();
    doc.fontSize(16).text("Products:");

    invoiceProduct.forEach((invoiceProduct) => {
      const product = invoiceProduct.Product;
      doc.moveDown();
      doc.fontSize(12).text(`Product name: ${product.product_name}`);
      doc.fontSize(12).text(`Quantity: ${invoiceProduct.quantity}`);
      doc.fontSize(12).text(`Price: ${invoiceProduct.price}`);
      doc.fontSize(12).text(`Discount(%): ${invoiceProduct.discount}`);
      doc.fontSize(12).text(`Amount: ${invoiceProduct.amount}`);
    });
    

    // end the PDF document
    doc.end();
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to generate PDF");
  }
});

module.exports = router;
