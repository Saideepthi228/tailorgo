import express from "express";
import { login, signup } from "../controllers/authController.js";
const r = express.Router();
r.post("/signup", signup);
r.post("/login", login);
export default r;
