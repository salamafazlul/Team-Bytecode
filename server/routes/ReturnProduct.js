const express = require("express");
const { Return_Product } = require("../models");
const router = express.Router();
const app = express();

router.post("/", async (req, res) => {
  const { ProductID, ProductName, QTY, Reason } = req.body;
  console.log("sdfsdfsfdsdf", req.body);

  try {
    // Create a new return in the database
    await Return_Product.create({
      Product_id: ProductID,
      Product_name: ProductName,
      Quantity: QTY,
      Reason,
    });

    // Send a response indicating the success of the creation
    res.json({ message: "Return created successfully" });
  } catch (error) {
    // Handle any errors that occurred during the creation process
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the return" });
  }
});

module.exports = router;
