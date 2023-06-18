const express = require("express");
const { Purchase } = require("../models");
const router = express.Router();
const app = express();

router.get("/", (req, res) => {
  res.send("Route worked");
});

app.put("/api/products/:ppid", (req, res) => {
  const ppid = req.params.ppid;
  const newQuantity = req.body.ppqty;

  // Update the quantity in the database
  const updateQuery = `UPDATE product SET Quantity = ? WHERE ProductId = ?`;
  connection.query(updateQuery, [newQuantity, ppid], (error, results) => {
    if (error) {
      console.error("Error updating quantity in the database: ", error);
      res.sendStatus(500);
    } else {
      console.log("Quantity updated successfully.");
      res.sendStatus(200);
    }
  });
});

app.put("/:ppid", (req, res) => {
  const ppid = req.params.ppid;
  const newQuantity = req.body.ppqty;

  // Update the quantity in the database
  const updateQuery = `UPDATE product SET Quantity = ? WHERE Product_id = ?`;
  connection.query(updateQuery, [newQuantity, ppid], (error, results) => {
    if (error) {
      console.error("Error updating quantity in the database: ", error);
      res.sendStatus(500);
    } else {
      console.log("Quantity updated successfully.");
      res.sendStatus(200);
    }
  });
});

module.exports = router;
