const express = require("express");
const router = express.Router();
const { Product } = require("../models");


router.get('/api/getProduct', async (req, res) => {
    try {
      const products = await Product.findAll();
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
router.post("/", async (req, res) => {
    
});

module.exports = router;
