import db from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*
SIGNUP
*/
export async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (name,email,password,role)
       VALUES (?,?,?,?)`,
      [name, email, hashedPassword, role || "customer"]
    );

    res.json({
      success: true,
      user_id: result.insertId
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
}


/*
LOGIN
*/
export async function login(req, res) {
  try {

    const { email, password } = req.body;

    const [rows] = await db.query(
      `SELECT * FROM users WHERE email=?`,
      [email]
    );

    if (!rows.length) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "tailorgo_secret",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
}