const express = require("express");
const router = express.Router();
const app = express();
const { Product } = require("../models");

router.get("/", (req, res) => {
  res.send("kelum");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const post = req.body;
  await Product.create(post);
  console.log(res);
  res.json(post);
});

module.exports = router;
