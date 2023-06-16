const express = require("express");
require('dotenv').config();
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(express.json())
app.use(cors())

const db = require("./models");

const statsRouter = require('./routes/Stats')
app.use ("/stats", statsRouter)
const invoiceProductRouter = require('./routes/Invoice_Product')
app.use("/invoices", invoiceProductRouter)


// Routers
const postRouter = require('./routes/Invoice');
app.use("/Invoice", postRouter );

const  invoiceRouter = require('./routes/Invoice')
app.use ("/Invoice", invoiceRouter )

const  productRouter = require('./routes/Product')
app.use ("/Product", productRouter )

const  invoice_productRouter = require('./routes/Invoice_Product')
app.use ("/Invoice_Product", invoice_productRouter )

const  discountRouter = require('./routes/Discount')
app.use ("/Discount", discountRouter )

const  emailpdfRouter = require('./routes/Email_Invoice')
app.use ("/Email_Invoice", emailpdfRouter )

const  cardPaymentRouter = require('./routes/Card_Payment')
app.use ("/Card_Payment", cardPaymentRouter )

const  cashierRouter = require('./routes/Cashier')
app.use ("/Cashier", cashierRouter )

const  productCategoryRouter = require('./routes/Product_Category')
app.use ("/Product_Category", productCategoryRouter )

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
