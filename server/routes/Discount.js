const express = require("express");
const router = express.Router();
const { Discount } = require("../models");


router.get('/api/getall', async (req, res) => {
  try {
    const discount = await Discount.findAll();
    res.send(discount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  });
  
router.post("/api", async (req, res) => {
  try {
    const discount = await Discount.create(req.body);
    res.json({
      status : "success"
    });
  } catch (error) {
    console.log(error.errors)
    res.status(500).json({
      message : `Internal Server Error ${error} `
    });
  }
  });
  router.put("/api", async (req, res) => {
    
    try {
      const discount = await Discount.update({
        rate_amount: req.body.rate_amount ,
        // type: req.body.type ,
        startDate: req.body.startDate ,
        endDate: req.body.endDate 
      },{ where: { product_id: req.body.product_id} });
      res.json({
        status : "success"
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message : `Internal Server Error ${error} `
      });
    }
    });
    router.delete("/api", async (req, res) => {
      console.log(req.body)
      try {
        const discount = await Discount.destroy({ where: { product_id: req.body.product_id } });
        res.json({
          status : "success"
        });
      } catch (error) {
        console.log(error)
        res.status(500).json({
          message : `Internal Server Error ${error} `
        });
      }
      });
module.exports = router;