const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bypos_db",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/getProduct", (req, res) => {
  const sqlSelect = "select * from product";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});
app.post("/api/insert", (req, res) => {
  const amount = req.body.amount;
  const sqlInsert = "insert into sale_amount (amount) values (?)";
  db.query(sqlInsert, [amount], (err, result) => {
    console.log("successful insert");
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
