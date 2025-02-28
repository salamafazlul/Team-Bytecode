const express = require("express");
const router = express.Router();
const { Product, Product_Category, DeleteProduct } = require("../models");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const nodemailer = require("nodemailer");

router.get("/api/getProduct", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/api/getProductCategory", async (req, res) => {
  try {
    const productCategory = await Product_Category.findAll();
    res.send(productCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/api/getProductReOrderByEmail", async (req, res) => {
  let temp = req.body.data?.map((item) => [
    item.product_id,
    item.product_name,
    item.stock,
    item.reorder_level,
    item.reorder_status,
  ]);
  try {
    res.setHeader("Content-Type", "application/pdf");

    const doc = new PDFDocument();
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);

      // create a nodemailer transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "salama.fhf@gmail.com",
          pass: "zxqtkhhafyxjexjk",
        },
      });

      // create the email message
      const message = {
        from: "salama.fhf@gmail.com",
        to: "fazlulsalama@gmail.com",
        subject: "ByTech POS Invoice",
        attachments: [
          {
            filename: `ProductReport.pdf`,
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
    // Set the content type as application/pdf

    // Pipe the PDF document directly to the response object
    doc.pipe(res);

    // Set up the header section
    // doc.image('../public/images/logo.png', 50, 50, { width: 100 });
    doc.fillColor("blue").fontSize(24).text("Product Report", 50, 70);
    doc
      .fillColor("gray")
      .fontSize(14)
      .text("Date : " + new Date().toDateString(), 50, 110);

    // Generate the table dynamically

    const table = [
      ["Product ID", "Name", "Current Stock", "Re-order", "status"],
    ];
    temp.forEach((element, index) => {
      table[index + 1] = element;
    });

    const tableTop = 150;
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
        doc.text(cellValue, cellLeft + cellPadding, cellTop + cellPadding, {
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

router.post("/api/getProductReOrderReport", async (req, res) => {
  let temp = req.body?.map((item) => [
    item.product_id,
    item.product_name,
    item.stock,
    item.reorder_level,
    item.reorder_status,
  ]);
  try {
    const doc = new PDFDocument();
    // Set the content type as application/pdf
    res.setHeader("Content-Type", "application/pdf");

    // Pipe the PDF document directly to the response object
    doc.pipe(res);

    // Set up the header section
    // doc.image('../public/images/logo.png', 50, 50, { width: 100 });
    doc.fillColor("blue").fontSize(24).text("Re-order Product Report", 50, 70);
    doc
      .fillColor("gray")
      .fontSize(14)
      .text("Date : " + new Date().toDateString(), 50, 110);

    // Generate the table dynamically

    const table = [
      ["Product ID", "Name", "Current Stock", "Re-order", "status"],
    ];
    temp.forEach((element, index) => {
      table[index + 1] = element;
    });

    const tableTop = 150;
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
        doc.text(cellValue, cellLeft + cellPadding, cellTop + cellPadding, {
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

router.get("/", async (req, res) => {
  const categories = await Product_Category.findAll();
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Product_Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.log("Error retrieving category details:", error);
    res
      .status(500)
      .send({ error: "An error occurred while retrieving category details" });
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Product_Category.create(post);
  res.json(post);
});

//delete category
router.delete("/:id", async (req, res) => {
  const category = await Product_Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).send({ error: "Category not found" });
  }

  //find related products
  const product = await Product.findAll({
    where: {
      category_id: req.params.id,
    },
  });
  // console.log(product);

  //copy related products to new table
  for (const p of product) {
    await DeleteProduct.create({
      deleteProduct_id: p.product_id,
      product_name: p.product_name,
      buying_price: p.buying_price,
      selling_price: p.selling_price,
      stock: p.stock,
      reorder_level: p.reorder_level,
      reorder_status: p.reorder_status,
      expiry_date: p.expiry_date,
    });
  }

  //delete products from product table
  await Product.destroy({
    where: {
      category_id: req.params.id,
    },
  });

  //delete category
  await category.destroy();
  res.send({ message: "Category deleted successfully" });
});

module.exports = router;
