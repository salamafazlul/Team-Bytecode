const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("kelum");
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Category.create(post);
  res.json(post);
});

module.exports = router;
