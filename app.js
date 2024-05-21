/*const express = require("express");
const { pool } = require("./db");
const { PORT } = require("./config");

const app = express();

app.get("/api/tasks", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM TASKS");
  res.json(rows);
});

app.listen(PORT);
console.log("Server on port", PORT);*/

const express = require("express");
const mysql = require("mysql2");
const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as id " + connection.threadId);
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/data", (req, res) => {
  connection.query("SELECT * FROM TASKS", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      res.status(500).send(err.toString());
    } else {
      res.json(results);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
