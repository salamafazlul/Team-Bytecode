import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sri@2244",
  database: "inventorymanagement",
});

app.get("/", (req, res) => {
  res.json("hello this is my test backend");
});

app.listen(8801, () => {
  console.log("connected to backend!");
});
