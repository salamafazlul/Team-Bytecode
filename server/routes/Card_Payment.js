const express = require("express");
const router = express.Router();
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payment", async (req, res) => {
  let status, error;
  const token = req.body.token;
  const value = req.body.amount;
  amount = parseInt(value);
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    status = "success";
  } catch (error) {
    status = "Failure";
    console.log(error)
  }
  console.log(status);
  res.json({ error, status });
});
module.exports = router;
