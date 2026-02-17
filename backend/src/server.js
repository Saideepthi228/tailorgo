// server.js (ESM)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import routes from "./routes/index.js";
import db from "./utils/db.js";

dotenv.config();

// ------------------------------------
// EXPRESS + SOCKET SERVER
// ------------------------------------
const app = express();
const httpServer = createServer(app);

// ------------------------------------
// SOCKET.IO SERVER SETUP
// ------------------------------------
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // your frontend
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("🔥 User connected:", socket.id);

  // -----------------------------
  // JOIN CUSTOM ROOM (chat/order)
  // -----------------------------
  socket.on("join_room", ({ room }) => {
    socket.join(room);
    console.log(`📌 User joined room: ${room}`);
  });

  // -----------------------------
  // CHAT MESSAGE
  // -----------------------------
  socket.on("message", ({ room, payload }) => {
    io.to(room).emit("message", payload);
  });

  // -----------------------------
  // VOICE / VIDEO CALL REQUESTS
  // -----------------------------
  socket.on("call_request", ({ room, type }) => {
    io.to(room).emit("call_request", { type });
  });

  // -----------------------------
  // TYPING INDICATOR
  // -----------------------------
  socket.on("typing", ({ room, user }) => {
    io.to(room).emit("typing", user);
  });

  // -----------------------------
  // LIVE ORDER STATUS UPDATE
  // -----------------------------
  socket.on("order_status_update", ({ orderId, status }) => {
    console.log("📢 Status Update:", orderId, status);

    // Notify customer watching this order
    io.to(`order_${orderId}`).emit("order_status_update", {
      orderId,
      status
    });
  });

  // -----------------------------
  // DISCONNECT EVENT
  // -----------------------------
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ------------------------------------
// EXPRESS MIDDLEWARE
// ------------------------------------
app.use(cors());
app.use(express.json());

// MAIN API ROUTES
app.use("/api", routes);

// ------------------------------------
// TEST DATABASE CONNECTION
// ------------------------------------
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ Connected to MySQL database");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();

// ------------------------------------
// DEFAULT HOME ROUTE
// ------------------------------------
app.get("/", (req, res) => {
  res.send("TailorGo Backend is Running ✔");
});

// ------------------------------------
// START SERVER
// ------------------------------------
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Backend + Socket.io running on http://localhost:${PORT}`);
});
