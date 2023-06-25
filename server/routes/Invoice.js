const express = require("express");
const router = express.Router();
const {
  Invoice,
  Invoice_Product,
  Product,
  Sale_of_Refund,
  Bill_Discount,
} = require("../models");
const { Op } = require("sequelize");


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

router.get("/api/getBillDiscount", async (req, res) => {
  const invoice_id = req.query.invoice_id;
  try {
    const invoice = await Invoice.findByPk(invoice_id);
    if (!invoice) {
      res.status(404).send("Invoice not found");
      return;
    }
    const discount = await Bill_Discount.findOne({
      where: {
        start_date: {
          [Op.lte]: new Date(),
        },
        end_date: {
          [Op.gte]: new Date(),
        },
      },
      order: [["end_date", "ASC"]],
    });

    if (!discount) {
      return res.status(404).send("No discount available.");
    }
    await invoice.update({ discount: discount.rate });
    res.json({ rate: discount.rate });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occurred while retrieving the bill discount rate.");
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
  const invoice_id = req.query.invoice_id; //invoicekey (saleid)
  const currentInvoice = req.query.currentInvoice; //refundid

  try {
    const InvoiceDetail = await Invoice.findOne({
      where: {
        invoice_id: invoice_id,
      },
    });
    if (!InvoiceDetail) {
      return res.status(404).send("Invoice not found.");
    }

    const refundIds = await Sale_of_Refund.findAll({
      attributes: ["refund_id"],
    });
    const refundIdList = refundIds.map((refund) => refund.refund_id);
    const invoiceId = parseInt(invoice_id.trim());

    if (invoiceId === parseInt(currentInvoice.trim())) {
      return res.json({ status: 200 });
    } else if (refundIdList.includes(invoiceId)) {
      return res.json({ status: 204 });
    }

    const discount = InvoiceDetail.discount;
    const charge_id = InvoiceDetail.charge_id;

    //check if a refund is already made for the same sale_id
    const refundMade = await Sale_of_Refund.findOne({
      where: {
        sale_id: invoice_id,
        refund_id: {
          [Op.not]: currentInvoice,
        },
      },
    });
    if (refundMade) {
      return res.json({ status: 400 });
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
      { discount: discount, charge_id: charge_id },
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

router.get("/api/getProduct", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//get invoice list /api/getInvoiceList
router.get("/", async (req, res) => {
  const invoiceList = await Invoice.findAll();
  res.send(invoiceList);
});

module.exports = router;
