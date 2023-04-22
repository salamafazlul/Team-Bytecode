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

router.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).send({ error: "Product not found" });
  }
  await product.destroy();
  res.send({ message: "Product deleted successfully" });
});

module.exports = router;
