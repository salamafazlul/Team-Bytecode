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
app.get("/api/getInvoiceList", (req, res) => {
  const sqlSelect = "select * from invoice_items";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});
app.get("/api/getTotal", (req, res) => {
  const sqlSelect = "select sum(amount) as amount from invoice_items";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});
app.post("/api/setTotalDiscount/", (req,res)=>{
  const discount = req.body.discount;
})
app.post("/api/addToInvoice/", (req, res) => {
  const pid = req.body.pid;
  const pname = req.body.pname;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const amount = price * quantity;
  const sqlInsert =
    "Insert into invoice_items (product_id,name,price,quantity,amount) values(?,?,?,?,?)";
  db.query(sqlInsert, [pid, pname, price, quantity, amount], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
