import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sri@2244",
  database: "inventorymanagement",
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello this is my test backend");
});

app.get("/product", (req, res) => {
  const q = "SELECT * FROM inventorymanagement.product";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/product", (req, res) => {
  const q =
    "INSERT INTO product (`id`,`name`,`quntity`,`byingprice`,`sellingprice`,`category`,`min_stock_level`,`description`) VALUES (?)";
  const values = [
    "id from backend",
    "name from backend",
    "quntity from backend",
    "byingprice from backend",
    "sellingprice from backend",
    "category from backend",
    "min_stock_level from backend",
    "description from backend",
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8801, () => {
  console.log("connected to backend!");
});
