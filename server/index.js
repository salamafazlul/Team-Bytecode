const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ProductRouter = require("./routes/Product");
app.use("/Product", ProductRouter);

const ReturnRouter = require("./routes/ReturnProduct");
app.use("/Return", ReturnRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
