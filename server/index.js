const express = require("express");
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = require("./models");


// Routers
const  invoiceRouter = require('./routes/Invoice')
app.use ("/Invoice", invoiceRouter )

const  productRouter = require('./routes/Product')
app.use ("/Product", productRouter )

const  invoice_productRouter = require('./routes/Invoice_Product')
app.use ("/Invoice_Product", invoice_productRouter )

const  discountRouter = require('./routes/Discount')
app.use ("/Discount", discountRouter )


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
