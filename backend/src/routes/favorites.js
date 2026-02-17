import express from "express";
import db from "../utils/db.js";

const router = express.Router();

// Add favorite
router.post("/:userId/:tailorId", async (req, res) => {
  const { userId, tailorId } = req.params;
  try {
    await db.query(
      "INSERT IGNORE INTO favorites (user_id, tailor_id) VALUES (?, ?)",
      [userId, tailorId]
    );
    res.json({ message: "Tailor added to favorites ❤️" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove favorite
router.delete("/:userId/:tailorId", async (req, res) => {
  const { userId, tailorId } = req.params;
  try {
    await db.query(
      "DELETE FROM favorites WHERE user_id = ? AND tailor_id = ?",
      [userId, tailorId]
    );
    res.json({ message: "Removed from favorites 💔" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user favorites
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT t.* FROM tailors t 
       JOIN favorites f ON f.tailor_id = t.id
       WHERE f.user_id = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
