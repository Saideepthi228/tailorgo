import db from "../utils/db.js";

export async function updateStatus(req, res) {
  try {
    const { order_id, status } = req.body;

    // Get current timeline
    const [rows] = await db.query(
      "SELECT timeline FROM orders WHERE id = ?",
      [order_id]
    );

    let timeline = rows[0]?.timeline || [];

    // Add new status
    timeline.push({
      time: new Date(),
      status
    });

    await db.query(
      "UPDATE orders SET status=?, timeline=? WHERE id=?",
      [status, JSON.stringify(timeline), order_id]
    );

    // Notify customer via socket
    req.io.to(`order_${order_id}`).emit("order_update", { order_id, status });

    res.json({ success: true });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ error: "Failed to update order status" });
  }
}
