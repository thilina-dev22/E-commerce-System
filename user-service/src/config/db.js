require('dotenv').config();
const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "ecommerce",
});

async function initDb() {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.DB_PASSWORD,
    });
    await conn.query("CREATE DATABASE IF NOT EXISTS ecommerce");
    await conn.end();
    await pool.query(
      "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))",
    );
    console.log("MySQL Database for user-service ready.");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

module.exports = { pool, initDb };
