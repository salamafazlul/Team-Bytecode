const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const { Invoice_Product, Product, Invoice, User } = require("../models");

router.post("/api/generatePdf", async (req, res) => {
  const { email, invoice_id } = req.body;
  try {
    // Find the invoice with the given invoice_id and its associated invoice products
    const invoiceProducts = await Invoice_Product.findAll({
      where: { invoice_id },
      include: [{ model: Product, attributes: ["product_name"], as: "Product" }],
    });

    const invoice = await Invoice.findOne({
      where: { invoice_id },
      include: [{ model: User, attributes: ["user_name"] }],
    });

    if (!invoiceProducts) {
      return res.status(404).send("Invoice not found");
    }

    // Transform the data using map
    const transformedData = invoiceProducts.map((invoiceProduct) => {
      const { product_name } = invoiceProduct.Product;
      return {
        product_id: invoiceProduct.product_id,
        product_name,
        quantity: invoiceProduct.quantity,
        price: invoiceProduct.price,
        discount: invoiceProduct.discount,
        amount: invoiceProduct.amount,
      };
    });

    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF document to a buffer
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);

      // Create a nodemailer transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "salama.fhf@gmail.com",
          pass: "zxqtkhhafyxjexjk",
        },
      });

      // Create the email message
      const message = {
        from: "salama.fhf@gmail.com",
        to: email,
        subject: "ByTech POS Invoice",
        html: `
        <h1>Thank you for shopping with us!</h1>
        <p>We appreciate your business and are grateful for your support. At ByTech POS, we strive to provide the best products and services to our customers.</p>
        <p>Your satisfaction is our top priority, and we hope that you had a wonderful shopping experience with us. If you have any feedback or suggestions, please don't hesitate to reach out.</p>
        <p>Once again, thank you for choosing ByTech POS. We look forward to serving you again in the future. Have a fantastic day!</p>        
        `,
        attachments: [
          {
            filename: `invoice-${invoice_id}.pdf`,
            content: pdfData,
            contentType: "application/pdf",
          },
        ],
      };

      // Send the email
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send("Failed to send the invoice");
        } else {
          console.log("Invoice sent successfully");
          res.status(200).send("Invoice sent successfully");
        }
      });
    });

    // Add some content to the PDF document
    doc.fillColor("blue").fontSize(25).text("BY TECH POS", { align: "center" });
    doc.fillColor("blue").fontSize(16).text(`Invoice ${invoice_id}`, { align: "center" });

    // Add the invoice details to the PDF document
    doc.moveDown();
    const invoiceDetailsTop = doc.y; // Store the current y-coordinate for invoice details positioning
    doc.fillColor("black").fontSize(12).text(`Date: ${invoice.date}`);
    doc.fillColor("black").fontSize(12).text(`Cashier: ${invoice.User.user_name}`);
    doc.fillColor("black").fontSize(12).text(`Gross Amount: ${invoice.total}`);
    doc.fillColor("black").fontSize(12).text(`Bill Discount: ${invoice.discount} %`);
    doc.fillColor("black").fontSize(12).text(`Net Amount: ${invoice.total - (invoice.total * invoice.discount) / 100}`);
    doc.moveDown();

    // Generate the table dynamically

    const table = [["Product ID", "Name", "Quantity", "Price", "Discount", "Amount"]];
    transformedData.forEach((element) => {
      const { product_id, product_name, quantity, price, discount, amount } = element;
      table.push([product_id, product_name, quantity, price, discount, amount]);
    });

    const tableTop = invoiceDetailsTop + 50; // Adjust the tableTop value to create space between invoice details and the table
    const tableLeft = 50;
    const cellPadding = 10;
    const rowHeight = 30;
    const colWidth = (doc.page.width - tableLeft * 2) / table[0].length;

    doc.font("Helvetica-Bold").fontSize(12);
    doc.fillColor("black");

    for (let i = 0; i < table.length; i++) {
      const row = table[i];
      for (let j = 0; j < row.length; j++) {
        const cellValue = row[j];
        const cellTop = tableTop + (i + 1) * rowHeight;
        const cellLeft = tableLeft + j * colWidth;

        doc.rect(cellLeft, cellTop, colWidth, rowHeight).stroke();
        doc.text(cellValue.toString(), cellLeft + cellPadding, cellTop + cellPadding, {
          width: colWidth - cellPadding * 2,
          align: "left",
          valign: "top",
        });
      }
    }

    // Finalize the PDF and end the response
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
