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
  const invoice_id = req.query.invoice_id;
  const sqlSelect =
    "SELECT i.*, p.product_name, p.selling_price FROM invoice_product i JOIN product p ON p.product_id = i.product_id where invoice_id=?";
  db.query(sqlSelect, [invoice_id], (err, result) => {
    res.send(result);
  });
});
app.get("/api/getTotal", (req, res) => {
  const invoice_id = req.query.invoice_id;
  const sqlSelect =
    "select sum(price) as total from invoice_product where invoice_id=? ";
  db.query(sqlSelect, [invoice_id], (err, result) => {
    res.send(result);
  });
});
app.post("/api/setTotalDiscount/", (req, res) => {
  const discount = req.body.discount / 100;
  const sqlInsert = "insert into invoice (discount) values(?)";
  db.query(sqlInsert, [discount], (err, result) => {
    if (err) console.log(err);
  });
});
app.post("/api/createInvoice/", (req, res) => {
  const sqlInsert =
    "INSERT INTO invoice (user_id, date, total, discount) VALUES (1, NOW(), 0, 0)";
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error creating invoice");
    }
    const invoice_id = result.insertId;
    res.send({ invoice_id });
  });
});
app.post("/api/addToInvoice/", (req, res) => {
  const invoice_id = req.body.iid;
  const product_id = req.body.pid;
  const quantity = req.body.quantity;
  const price = req.body.price * quantity;
  const discount = req.body.discount * quantity;
  const sqlInsert =
    "Insert into invoice_product (invoice_id,product_id,quantity, price, discount) values(?,?,?,?,?)";
  db.query(
    sqlInsert,
    [invoice_id, product_id, quantity, price, discount],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
