const express = require('express');
const router = express.Router();
const {Discount} = require("../models");

router.get("/", async (req, res)=>{
    const listOfDiscount = await Discount.findAll()
    res.json(listOfDiscount);
});

router.post("/", async (req, res)=>{
    const post = req.body
    await Discount.create(post);
    res.json(post);
});


module.exports = router;