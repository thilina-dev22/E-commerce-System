const { pool } = require("../config/db");

exports.getAll = async (req, res) => {
  if (!pool) return res.status(500).json({ error: "DB not initialized" });
  try {
    const [rows] = await pool.query("SELECT * FROM carts");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  if (!pool) return res.status(500).json({ error: "DB not initialized" });
  try {
    const { userId, amount } = req.body;
    const [result] = await pool.query(
      "INSERT INTO payments (userId, amount, status) VALUES (?, ?, 'Success')",
      [userId, amount],
    );
    res
      .status(200)
      .json({
        status: "Success",
        transactionId: result.insertId,
        message: "Payment processed successfully",
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
