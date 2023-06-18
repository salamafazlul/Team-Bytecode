const express = require("express");
const router = express.Router();
const { Product } = require("../models");

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.json({ Product_name: product.product_name }); // Return only the product name
  } catch (error) {
    console.error("Error retrieving product: ", error);
    res.sendStatus(500);
  }
});

//delete product
router.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).send({ error: "Product not found" });
  }
  await product.destroy();
  res.send({ message: "Product deleted successfully" });
});

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

      console.log(product.stock, newQuantity);
      // Update the product's quantity
      let Quantity = parseInt(product.stock) + parseInt(newQuantity);

      await product.update(
        {
          stock: Quantity,
        },
        { where: { product_id: productId } }
      );

      console.log(`Product with ID ${productId} updated successfully.`);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating products: ", error);
    res.sendStatus(500);
  }
});

router.put("/return", async (req, res) => {
  const product = await Product.findOne({
    where: { product_id: req.body.ProductID },
  });
  console.log(product);
  const newproduct = await Product.update(
    {
      stock: parseInt(product.stock) - parseInt(req.body.QTY),
    },
    {
      where: { product_id: req.body.ProductID },
    }
  );
});

module.exports = router;
