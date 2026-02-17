import express from "express";
import { getServicesByTailor } from "../controllers/serviceController.js";

const router = express.Router();

// /api/services/tailor/3
router.get("/tailor/:tailorId", getServicesByTailor);

export default router;
