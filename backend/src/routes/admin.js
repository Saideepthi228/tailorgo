// admin.js
import express from "express";
import { listUsers, makeAdmin, removeUser } from "../controllers/adminController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// protect these routes - auth middleware should check token and admin flag
router.get("/users", auth, listUsers);
router.post("/users/:id/make-admin", auth, makeAdmin);
router.delete("/users/:id", auth, removeUser);

export default router;
