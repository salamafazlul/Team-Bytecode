const express = require("express");
const router = express.Router();
const {Invoice, Product_Category, Invoice_Product, Product} = require("../models");

router.get("/api/dailySales", async (req, res) => {
    const dailyIncome = await getDailyIncome();
    const categories = await getNumberOfCategories();
    const totalRevenue = await getTotalRevenue();
    const totalProfit = await getTotalProfit();
    res.send({
        "dailyIncome": dailyIncome,
        "categories": categories,
        "totalRevenue": totalRevenue,
        "totalProfit": totalProfit,
    });
})

const getDailyIncome = async () => {
    // const today = new Date().toISOString().split("T")[0].concat("T00:00:00.000Z");
    // const invoice = await Invoice.findAll({
    //     where: {
    //         date: today
    //     }
    // }); //todo insert some daily sales and enable the query to get data matches with current date
    const invoice = await Invoice.findAll();
    return invoice.map(invoice => invoice.total).map(t => +t).reduce((p, c) => p + c);
}

const getNumberOfCategories = async () => {
    return await Product_Category.count();
}

const getTotalRevenue = async () => {
    const invoice = await Invoice.findAll();
    return invoice.map(invoice => invoice.total).map(t => +t).reduce((p, c) => p + c);
}

const getTotalProfit = async () => {
    const invoice_products = await Invoice_Product.findAll();
    const products = await Product.findAll();
    const totalProfit = invoice_products.map(invoiceProduct => {
        const product = products.find(p => p.product_id === invoiceProduct.product_id);
        console.log('product', product);
        if (product) {
            return (product.selling_price - product.buying_price) * invoiceProduct.quantity;
        }
        else return 0;
    }).reduce((p, c) => p + c);
    return totalProfit;
}

module.exports = router;
