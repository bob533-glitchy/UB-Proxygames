import express from "express";
import { createServer } from "node:http";
import { join } from "node:path";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { createBareServer } from "@tomphttp/bare-server-node";

const app = express();
const server = createServer(app);
const bare = createBareServer("/bare/");
const PORT = Number(process.env.PORT) || 3000;

const publicDir = join(process.cwd(), "public");

// Your own files first.
app.use(express.static(publicDir));

// Ultraviolet's browser-side files.
app.use("/uv/", express.static(uvPath));

// Health check.
app.get("/health", (_req, res) => {
  res.type("text/plain").send("TLD Proxy is running.");
});

// Bare server traffic.
app.use((req, res, next) => {
  if (req.url.startsWith("/bare/")) {
    bare(req, res);
    return;
  }
  next();
});

server.on("upgrade", (req, socket, head) => {
  if (req.url?.startsWith("/bare/")) {
    bare.upgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`TLD Proxy listening on port ${PORT}`);
});
