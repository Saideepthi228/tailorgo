// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import routes from "./routes/index.js";
import db from "./utils/db.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

/*
SOCKET SERVER
*/
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.set("io", io);

/*
SOCKET EVENTS
*/
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", ({ room }) => {
    socket.join(room);
    console.log("Joined room:", room);
  });

  socket.on("message", ({ room, payload }) => {
    io.to(room).emit("message", payload);
  });

  socket.on("typing", ({ room, user }) => {
    io.to(room).emit("typing", user);
  });

  socket.on("call_request", ({ room, type }) => {
    io.to(room).emit("call_request", { type });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

/*
MIDDLEWARE
*/
app.use(cors());
app.use(express.json());

/*
API ROUTES
*/
app.use("/api", routes);

/*
DATABASE TEST
*/
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

/*
ROOT ROUTE
*/
app.get("/", (req, res) => {
  res.send("TailorGo backend running");
});

/*
START SERVER
*/
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});