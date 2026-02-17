// adminController.js
import db from "../utils/db.js";

/**
 * Very simple admin controllers - your auth middleware should ensure req.user.isAdmin
 */

export const listUsers = async (req, res) => {
  try {
    // only admin
    if (!req.user?.isAdmin) return res.status(403).json({ message: "Forbidden" });

    const [rows] = await db.query("SELECT id, name, email, is_admin FROM users ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const makeAdmin = async (req, res) => {
  try {
    if (!req.user?.isAdmin) return res.status(403).json({ message: "Forbidden" });
    const id = req.params.id;
    await db.query("UPDATE users SET is_admin = 1 WHERE id = ?", [id]);
    res.json({ message: "User promoted to admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    if (!req.user?.isAdmin) return res.status(403).json({ message: "Forbidden" });
    const id = req.params.id;
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
