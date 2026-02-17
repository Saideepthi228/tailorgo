// src/controllers/orderController.js
import db from "../utils/db.js";

export async function createOrder(req, res) {
  try {
    const {
      tailor_id,
      pickup_address,
      phone,
      stitch_type,
      measurements
    } = req.body;

    const user_id = 1; // TEMP (login later)

    const [result] = await db.query(
      `INSERT INTO orders (user_id, tailor_id, pickup_address, phone, stitch_type, measurements)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        tailor_id,
        pickup_address,
        phone,
        stitch_type,
        JSON.stringify(measurements),
      ]
    );

    res.json({ success: true, order_id: result.insertId });
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
}

export async function getOrders(req, res) {
  try {
    const user_id = 1;

    const [rows] = await db.query(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [user_id]
    );

    rows.forEach((o) => {
      o.measurements = o.measurements ? JSON.parse(o.measurements) : {};
    });

    res.json(rows);
  } catch (err) {
    console.error("getOrders error:", err);
    res.status(500).json({ error: "Failed to load orders" });
  }
}
