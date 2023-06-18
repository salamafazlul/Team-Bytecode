const express = require("express");
const { Category } = require("../models");
const router = express.Router();
const app = express();

router.get("/", async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.log("Error retrieving category details:", error);
    res.status(500).send({ error: "An error occurred while retrieving category details" });
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Category.create(post);
  res.json(post);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).send({ error: "Category not found" });
  }
  await category.destroy();
  res.send({ message: "Category deleted successfully" });
});

module.exports = router;
