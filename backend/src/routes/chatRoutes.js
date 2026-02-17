import express from "express";
import { saveMessage, listMessages } from "../controllers/chatController.js";
const r = express.Router();
r.post("/message", saveMessage);
r.get("/messages", listMessages);
export default r;
