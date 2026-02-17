import express from "express";
import { getTailors } from "../controllers/tailorController.js";

const router = express.Router();

router.get("/", getTailors);

export default router;
