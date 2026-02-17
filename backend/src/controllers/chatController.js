import db from "../utils/db.js";
export const saveMessage = async (req, res) => {
  try {
    const { user_id, tailor_id, message, sender } = req.body;
    const [r] = await db.query("INSERT INTO messages (user_id, tailor_id, message, sender) VALUES (?,?,?,?)", [user_id, tailor_id, message, sender]);
    res.json({ id: r.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listMessages = async (req, res) => {
  try {
    const { user_id, tailor_id } = req.query;
    const [rows] = await db.query("SELECT * FROM messages WHERE user_id = ? AND tailor_id = ? ORDER BY id ASC", [user_id, tailor_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
