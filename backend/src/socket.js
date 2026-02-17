import { Server } from "socket.io";

export function initSocket(httpServer) {
  const io = new Server(httpServer, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    console.log("socket connected:", socket.id);
    socket.on("joinRoom", (room) => socket.join(room));
    socket.on("chatMessage", (msg) => {
      // msg expects { room, payload }
      if (msg?.room) io.to(msg.room).emit("chatMessage", msg.payload);
    });
    socket.on("callRequest", (payload) => {
      if (payload?.room) io.to(payload.room).emit("callRequest", payload);
    });
    socket.on("disconnect", () => console.log("socket disconnect:", socket.id));
  });
}
