const { pool } = require('../config/db');

exports.getAll = async (req, res) => {
  if (!pool) return res.status(500).json({ error: "DB not initialized" });
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  if (!pool) return res.status(500).json({ error: "DB not initialized" });
  try {
    const { name, email } = req.body;
    const [result] = await pool.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
