import db from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function signup(req, res) {
  const { name, email, password, phone } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing" });
  try {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (name,email,password,phone) VALUES (?,?,?,?)",
      [name || "", email, hashed, phone || ""]
    );
    const id = result.insertId;
    const token = jwt.sign({ id, email }, JWT_SECRET);
    res.json({ token, id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(401).json({ message: "Invalid" });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid" });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token, id: user.id, name: user.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
