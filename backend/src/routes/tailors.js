// src/routes/tailors.js

import express from "express";
import db from "../utils/db.js";
import {
  getTailors,
  getTailorById
} from "../controllers/tailorController.js";

const router = express.Router();

/*
GET ALL ONLINE TAILORS (CUSTOMER SIDE)
*/
router.get("/", getTailors);

/*
GET SINGLE TAILOR
*/
router.get("/:id", getTailorById);

/*
TAILOR GO ONLINE / OFFLINE
*/
router.post("/status", async (req, res) => {
  try {

    const { tailor_id, online } = req.body;

    if (!tailor_id) {
      return res.status(400).json({ error: "tailor_id required" });
    }

    await db.query(
      `UPDATE tailors 
       SET is_online = ? 
       WHERE id = ?`,
      [online ? 1 : 0, tailor_id]
    );

    res.json({
      success: true,
      online: online
    });

  } catch (err) {
    console.error("tailor status error:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

export default router;