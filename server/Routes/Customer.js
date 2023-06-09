const express = require("express");
const router = express.Router();
const { Customer } = require("../models");

router.get("/", async (rea, res) => {
  const listofCustomer = await Customer.findAll();
  res.json(listofCustomer);
});

// router.get("/", (req, res) => {
//   res.json("hello world");
// });

router.post("/", async (req, res) => {
  const post = req.body;
  await Customer.create(post);
  res.json(post);
});

// router.post();

module.exports = router;
