import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { createApp } from "./app.js";
import { registerSockets } from "#sockets/index.js";
import { env } from "#config/env.js";

const app = createApp();
const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: { origin: env.clientUrl, credentials: true },
});

registerSockets(io);

httpServer.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Nearby API listening on port ${env.port}`);
});
