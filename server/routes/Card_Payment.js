const express = require("express");
const router = express.Router();
const Stripe = require('stripe')('sk_test');


router.post('/payment', async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
    status = 'success';
  } catch (error) {
    status = 'Failure';
  }
  console.log(status)
  res.json({ error, status });
});
module.exports = router;
