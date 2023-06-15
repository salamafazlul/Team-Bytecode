const express = require("express");
const router = express.Router();
const {Invoice, Product_Category, Invoice_Product, Product} = require("../models");

router.get("/api/dailySales", async (req, res) => {
    const dailyIncome = await getDailyIncome();
    const categories = await getNumberOfCategories();
    const totalRevenue = await getTotalRevenue();
    const totalProfit = await getTotalProfit();
    const monthlyIncome = await getMonthlySales();
    const monthlyProfit = await getMonthlyProfit();
    const quantityByCategory = await getQuantityByCategory();
    const inventoryByCategory = await getInventoryByCategory();
    const topSellingProducts = await getTopSellingProducts();

    res.send({
        "dailyIncome": dailyIncome,
        "categories": categories,
        "totalRevenue": totalRevenue,
        "totalProfit": totalProfit,
        "monthlyIncome": monthlyIncome,
        "monthlyProfit": monthlyProfit,
        "quantityByCategory": quantityByCategory,
        "inventoryByCategory": inventoryByCategory,
        "topSellingProducts": topSellingProducts,
    });
})

const getTopSellingProducts = async () => {
    const inventoryProducts = await Invoice_Product.findAll({order: [["quantity", "DESC"]], limit: 4})
    const products = inventoryProducts.map(async ip => {
        const p = await Product.findByPk(ip.product_id);
        const q = ip.quantity;
        return {product: p, quantity: q};
    })
    return Promise.all(products);
}

const getInventoryByCategory = async () => {
    const categories = await Product_Category.findAll();
    return Promise.all(categories.map(async category => {
        const products = await Product.count({where: {category_Id: category.category_id}});
        return {category: category, total: products}
    }))
}

const getMonthlyProfit = async () => {
    const invoices = await Invoice.findAll();
    const products = await Product.findAll();
    const group = groupBy(invoices, invoice => {
        const d = new Date(invoice.date);
        return d.getFullYear() + "/" + (d.getUTCMonth() + 1);
    });

    return calculateProfit(group, products);
}

const calculateProfit = async (group, products) => {
    const res = {};
    const monthlyProfit = Object.keys(group).map(async month => {
        const sellingPrice = group[month].reduce((ps, s) => ps + (+s.total), 0);
        const buyingPrice = await group[month].map(async invoice => {
            const {invoice_id} = invoice;
            const invoiceProducts = await Invoice_Product.findAll({where: {invoice_id: invoice_id}});
            const invoiceBuyingPrice = await invoiceProducts.map(invoiceProduct => {
                const product = products.find(p => p.product_id === invoiceProduct.product_id);
                const total = +product.buying_price * +invoiceProduct.quantity
                // console.log('invoice', invoice.invoice_id, 'product', product.product_id, 'total', total)
                return total;
            })
                .reduce((ps, s) => ps + (+s), 0);
            // console.log('invoice bp', invoiceBuyingPrice);
            return invoiceBuyingPrice;
        })
            .reduce((g, c) => console.log('g', g, 'c', c))
        const profit = sellingPrice - buyingPrice;
        return {"month": month, "profit": profit};
    })
    return await Promise.all(monthlyProfit);
}

const getQuantityByCategory = async () => {
    const categories = await Product_Category.findAll();
    const categorySum = categories.map(async category => {
        const products = await Product.findAll({where: {category_id: category.category_id}});
        const productSales = await Promise.all(products.map(async p => {
            const sales = await Invoice_Product.findAll({where: {product_id: p.product_id}});
            const ss = await sales.reduce((ps, ip) => ps + +ip.quantity,  0)
            return ss;
        }));
        const sum = productSales
            .reduce((ps, s) => ps + +s, 0)
        return {"category": category, "total": sum}
    })
    return Promise.all(categorySum);
}

const getMonthlySales = async () => {
    const res = {};
    const invoices = await Invoice.findAll();
    const group = groupBy(invoices, invoice => {
        const d = new Date(invoice.date);
        return d.getFullYear() + "/" + (d.getUTCMonth() + 1);
    });
    Object.keys(group).map(month => {
        res[month] = group[month].reduce((ps, s) => ps + (+s.total), 0);
    })
    return res;
}

const groupBy = (x, f) => x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {});

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
        if (product) {
            return (product.selling_price - product.buying_price) * invoiceProduct.quantity;
        } else return 0;
    }).reduce((p, c) => p + c);
    return totalProfit;
}

module.exports = router;
