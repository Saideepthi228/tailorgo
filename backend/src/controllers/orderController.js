import db from "../utils/db.js";

/*
CREATE ORDER
*/
export async function createOrder(req, res) {
  try {

    const { tailor_id, measurements } = req.body;

    const user_id = 1;

    const m = measurements || {};

    const address = m.address || "";
    const phone = m.phone || "";

    const [result] = await db.query(
      `INSERT INTO orders 
      (user_id, tailor_id, address, phone, measurements, status)
      VALUES (?, ?, ?, ?, ?, 'pending')`,
      [
        user_id,
        tailor_id,
        address,
        phone,
        JSON.stringify(m)
      ]
    );

    res.json({
      success: true,
      order_id: result.insertId
    });

  } catch (err) {
    console.error("createOrder error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
}


/*
GET ALL ORDERS
*/
export async function getOrders(req, res) {
  try {

    const [rows] = await db.query(
      `SELECT * FROM orders ORDER BY created_at DESC`
    );

    rows.forEach((o) => {
      try {
        o.measurements = o.measurements
          ? JSON.parse(o.measurements)
          : {};
      } catch {
        o.measurements = {};
      }
    });

    res.json(rows);

  } catch (err) {
    console.error("getOrders error:", err);
    res.status(500).json({ error: "Failed to load orders" });
  }
}


/*
GET SINGLE ORDER
*/
export async function getOrderById(req, res) {
  try {

    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT * FROM orders WHERE id = ?`,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Order not found" });
    }

    const order = rows[0];

    try {
      order.measurements = order.measurements
        ? JSON.parse(order.measurements)
        : {};
    } catch {
      order.measurements = {};
    }

    res.json(order);

  } catch (err) {
    console.error("getOrderById error:", err);
    res.status(500).json({ error: "Failed to load order" });
  }
}


/*
CANCEL ORDER
*/
export async function cancelOrder(req, res) {
  try {

    const { id } = req.params;

    await db.query(
      `UPDATE orders SET status = 'cancelled' WHERE id = ?`,
      [id]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("cancelOrder error:", err);
    res.status(500).json({ error: "Failed to cancel order" });
  }
}


/*
UPDATE ORDER STATUS
*/
export async function updateOrderStatus(req, res) {
  try {

    const { id } = req.params;
    const { status } = req.body;

    const allowed = [
      "pending",
      "confirmed",
      "stitching",
      "ready",
      "delivered",
      "cancelled"
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    await db.query(
      `UPDATE orders SET status = ? WHERE id = ?`,
      [status, id]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("updateOrderStatus error:", err);
    res.status(500).json({ error: "Failed to update order status" });
  }
}