import http from "http";
import { Server } from "socket.io";
import { sendMessage } from "../controllers/messageController";

export const setupSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });
    socket.on("sendMessage", async ({ requestId, sender, content }) => {
      try {
        const savedMessage = await sendMessage({ requestId, sender, content });

        io.to(requestId).emit("receiveMessage", savedMessage);
      } catch (err) {
        console.error("Error sending message:", err);
        socket.emit("error", { message: "Failed to send message." });
      }
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
