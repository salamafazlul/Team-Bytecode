const express = require('express');
const router = express.Router();
const {Invoice} = require("../models");

router.get("/",async (req,res) => {
    const listOfInvoice = await Invoice.findAll();
    res.json(listOfInvoice);
});

router.post("/", async (req, res)=>{
    const post = req.body;
    await Invoice.create(post);
    res.json(post);
});


module.exports = router;