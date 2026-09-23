const TARGET_SITE =
  "https://tldgn-mathgames-production.up.railway.app/";

const frame = document.getElementById("proxyFrame");
const status = document.getElementById("status");

async function startProxy() {
  try {
    if (!window.__uv$config) {
      throw new Error("Ultraviolet config did not load.");
    }

    if (!window.BareMux) {
      throw new Error("bare-mux did not load.");
    }

    // UV 3.x uses bare-mux. EpoxyTransport talks to the Wisp endpoint
    // hosted by this same Railway service.
    const connection = new BareMux.BareMuxConnection(
      "/baremux/worker.js"
    );

    const wispURL =
      (location.protocol === "https:" ? "wss://" : "ws://") +
      location.host +
      "/wisp/";

    await connection.setTransport("/epoxy/index.mjs", [
      { wisp: wispURL }
    ]);

    // Register UV's service worker for the proxy URL prefix.
    await navigator.serviceWorker.register(
      __uv$config.sw,
      { scope: __uv$config.prefix }
    );

    const proxiedURL =
      __uv$config.prefix +
      __uv$config.encodeUrl(TARGET_SITE);

    frame.src = proxiedURL;
    frame.style.display = "block";
    status.style.display = "none";
  } catch (error) {
    console.error(error);
    status.textContent =
      "Proxy failed to start: " + error.message;
  }
}

startProxy();
