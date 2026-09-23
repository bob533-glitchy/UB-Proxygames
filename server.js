import express from "express";
import { createBareServer } from "@tomphttp/bare-server-node";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);
const bare = createBareServer("/bare/");

const PORT = process.env.PORT || 3000;

// Basic health check
app.get("/", (_req, res) => {
  res.type("text").send("TLD Proxy server is running.");
});

// Bare server endpoint used by proxy clients
app.use((req, res, next) => {
  if (req.url.startsWith("/bare/")) {
    bare(req, res);
    return;
  }

  next();
});

server.on("request", (req, res) => {
  if (req.url.startsWith("/bare/")) {
    return;
  }
});

// Upgrade WebSocket connections for the Bare server
server.on("upgrade", (req, socket, head) => {
  if (req.url.startsWith("/bare/")) {
    bare.upgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen(PORT, () => {
  console.log(`TLD Proxy server listening on port ${PORT}`);
});
