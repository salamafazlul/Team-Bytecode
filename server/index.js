const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
const db = require('./models');


// Routers
const discountRouter = require("./routes/Discount");
app.use("/discount",discountRouter);

  
  db.sequelize.sync().then(() => {
    app.listen(3001, () => {
      console.log("running on port 3001");
    });
  });

