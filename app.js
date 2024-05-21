const express = require("express");
const { pool } = require("./db");
const { PORT } = require("./config");

const app = express();

app.get("/api/tasks", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM TASKS");
  res.json(rows);
});

/*app.get("/ping", async (req, res) => {
  const [result] = await pool.query(`SELECT "hello world" as RESULT`);
  res.json(result[0]);
});

app.get("/create", async (req, res) => {
  const result = await pool.query('INSERT INTO users(name) VALUES ("John")');
  res.json(result);
});*/

app.listen(PORT);
console.log("Server on port", PORT);
