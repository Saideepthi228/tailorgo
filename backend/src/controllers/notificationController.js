// notificationController.js
import db from "../utils/db.js";

/**
 * Returns notifications for authenticated user (req.user.id).
 */
export const listNotifications = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const [rows] = await db.query(
      "SELECT id, payload, created_at, read_flag FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markRead = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query("UPDATE notifications SET read_flag = 1 WHERE id = ?", [id]);
    res.json({ message: "Marked read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Create a notification record. Body: { user_id, payload (JSON) }
 * This can be used by server logic (order created, call request, etc.)
 */
export const createNotification = async (req, res) => {
  try {
    const { user_id, payload } = req.body;
    const payloadStr = JSON.stringify(payload || {});
    await db.query("INSERT INTO notifications (user_id, payload, created_at) VALUES (?, ?, NOW())", [
      user_id,
      payloadStr,
    ]);
    res.status(201).json({ message: "Notification created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
