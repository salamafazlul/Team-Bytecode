import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sri@2244",
  database: "inventorymanagement",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is my inventry management backend");
});

app.get("/product", (req, res) => {
  const q = "SELECT * FROM inventorymanagement.product";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/product/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT name FROM product WHERE id = ?";
  db.query(query, [id], (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
    if (results.length === 0) {
      return res.status(404).send("Product not found");
    }
    const { name } = results[0];
    res.json({ name });
  });
});

app.get("/product/:name", (req, res) => {
  const { name } = req.params;
  const query = "SELECT id FROM product WHERE name = ?";
  db.query(query, [name], (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
    if (results.length === 0) {
      return res.status(404).send("wwwProduct not found");
    }
    const { id } = results[0];
    res.json({ id });
  });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM product WHERE id = ?";
  db.query(query, [id], (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Product not found");
    }
    res.sendStatus(204);
  });
});

app.post("/product", (req, res) => {
  const q =
    "INSERT INTO product (`id`,`name`,`quntity`,`byingprice`,`sellingprice`,`category`,`min_stock_level`,`description`) VALUES (?)";
  const values = [
    req.body.id,
    req.body.name,
    req.body.quntity,
    req.body.byingprice,
    req.body.sellingprice,
    req.body.category,
    req.body.min_stock_level,
    req.body.description,
  ];
  console.log(req);

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8801, () => {
  console.log("connected to backend!");
});
