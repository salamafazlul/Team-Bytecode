const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const CategoryRouter = require("./routes/Category");
app.use("/Category", CategoryRouter);

const ProductRouter = require("./routes/Product");
app.use("/Product", ProductRouter);

const ReturnRouter = require("./routes/ReturnProduct");
app.use("/Return", ReturnRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
