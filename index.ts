import app from "./src/app";
import { createSocketServer } from "./src/sockets/index";
import WebSocket from "ws";
const start = async () => {
  try {
    const address = await app.listen({
      port: 3000,
    });
    createSocketServer(app.server);

    console.log(`Server listening on ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
