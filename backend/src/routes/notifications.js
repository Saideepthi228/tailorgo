// notifications.js
import express from "express";
import { listNotifications, markRead, createNotification } from "../controllers/notificationController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/notifications - user's notifications (protected)
router.get("/", auth, listNotifications);

// POST /api/notifications/:id/read - mark as read (protected)
router.post("/:id/read", auth, markRead);

// POST /api/notifications - create (internal use / or by server on events)
router.post("/", createNotification);

export default router;
