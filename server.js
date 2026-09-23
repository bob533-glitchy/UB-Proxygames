import express from "express";
import { createServer } from "node:http";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import wisp from "wisp-server-node";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");
const publicPath = join(__dirname, "public");

const app = express();

// Serve the custom frontend first.
app.use(express.static(publicPath));

// Serve the official Ultraviolet browser assets supplied by the package.
app.use("/uv/", express.static(uvPath));

// Serve bare-mux and the matching Epoxy transport used by UV 3.x.
app.use("/baremux/", express.static(baremuxPath));
app.use("/epoxy/", express.static(epoxyPath));

app.get("/health", (_req, res) => {
  res.type("text/plain").send("UB-Proxygames is online.");
});

app.use((_req, res) => {
  res.status(404).type("text/plain").send("Not found");
});

const server = createServer();

server.on("request", (req, res) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (req.url?.startsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
    return;
  }
  socket.end();
});

const port = Number(process.env.PORT) || 8080;

server.listen(port, "0.0.0.0", () => {
  console.log(`UB-Proxygames listening on port ${port}`);
});
