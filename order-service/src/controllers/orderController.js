const { pool } = require('../config/db');

exports.getAll = async (req, res) => {
  if (!pool) return res.status(500).json({ error: "DB not initialized" });
  try {
    const [rows] = await pool.query("SELECT * FROM orders");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  if (!pool) return res.status(500).json({ error: "DB not initialized" });
  try {
    const { userId, productId, status } = req.body;
    const [result] = await pool.query("INSERT INTO orders (userId, productId, status) VALUES (?, ?, ?)", [userId, productId, status]);
    res.status(201).json({ id: result.insertId, userId, productId, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
