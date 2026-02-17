// src/routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getOrders
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/", getOrders);

export default router;
