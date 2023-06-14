const express = require("express");
const router = express.Router();
const { Customers } = require("../models");

router.get("/api/getEmailAddress", async (req, res) => {
  try {
    const mobileNo = parseInt(req.query.contactNumber);
    const customer = await Customers.findOne({
      where: {
        mobile_no: mobileNo,
      },
    });

    if (customer) {
      res.json({ email: customer.email });
    } else {
      res.json({ email: null });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
