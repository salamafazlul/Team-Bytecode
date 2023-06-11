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

/*
router.put("/", async (req, res) => {
  const productsToUpdate = req.body;

  try {
    for (const productData of productsToUpdate) {
      const { productId, newQuantity } = productData;

      // Find the product by ID
      const product = await Product.findByPk(productId);

      if (!product) {
        console.warn(`Product with ID ${productId} not found. Skipping update.`);
        continue;
      }

      // Update the product's quantity
      product.Quantity = newQuantity;
      await product.save();

      console.log(`Product with ID ${productId} updated successfully.`);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating products: ", error);
    res.sendStatus(500);
  }
});
*/

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    console.error("Error creating product: ", error);
    res.sendStatus(500);
  }
});

router.put("/", async (req, res) => {
  console.log("dsf", req.body);
  const productsToUpdate = req.body;

  try {
    for (const productData of productsToUpdate) {
      const { productId, newQuantity } = productData;

      // Find the product by ID
      const product = await Product.findByPk(productId);

      if (!product) {
        console.warn(
          `Product with ID ${productId} not found. Skipping update.`
        );
        continue;
      }

      console.log(product.Quantity, newQuantity);
      // Update the product's quantity
      let Quantity = parseInt(product.Quantity) + parseInt(newQuantity);

      await product.update(
        {
          Quantity,
        },
        { where: { productId: productId } }
      );

      console.log(`Product with ID ${productId} updated successfully.`);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating products: ", error);
    res.sendStatus(500);
  }
});

module.exports = router;
