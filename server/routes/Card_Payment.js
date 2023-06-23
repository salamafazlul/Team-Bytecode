const express = require("express");
const router = express.Router();
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Invoice } = require("../models");

router.post("/payment", async (req, res) => {
  let status, error, chargeId; // Declare chargeId outside of the try block
  const invoiceId = req.body.invoice_id;
  const token = req.body.token;
  const value = req.body.amount;

  amount = parseInt(value);
  try {
    const charge = await Stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    chargeId = charge.id; // Assign the value to chargeId

    await Invoice.update(
      { charge_id: chargeId },
      {
        where: {
          invoice_id: invoiceId,
        },
      }
    );
    status = "success";
  } catch (error) {
    status = "Failure";
    console.log(error);
  }
  console.log(status);
  res.json({ error, status });
});
module.exports = router;
