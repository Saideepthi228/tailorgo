import express from "express";
import { updateStatus } from "../controllers/trackingController.js";

const router = express.Router();

router.post("/update", updateStatus);

export default router;
