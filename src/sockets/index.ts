import { Server } from "http";
import WebSocket, { WebSocketServer } from "ws";

let wss: WebSocketServer;

function createSocketServer(server: Server) {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");

    ws.on("message", (message: string) => {
      console.log("Received:", message);
      ws.send(`Hello, you sent -> ${message}`);
      broadcastMessage(message);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
    console.log("WebSocket server is running");
  });
}

function broadcastMessage(message: string) {
  if (!wss) {
    throw new Error("WebSocket server is not initialized");
  }

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

export { createSocketServer, broadcastMessage };
