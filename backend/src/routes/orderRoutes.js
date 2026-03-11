import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);        // CREATE ORDER
router.get("/", getOrders);           // GET ALL ORDERS
router.get("/:id", getOrderById);     // GET SINGLE ORDER
router.post("/:id/cancel", cancelOrder);
router.put("/:id/status", updateOrderStatus);

export default router;