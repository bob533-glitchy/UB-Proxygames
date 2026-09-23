const TARGET_SITE =
  "https://tldgn-mathgames-production.up.railway.app/";

const frame = document.getElementById("proxyFrame");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");

async function startProxy() {
  try {
    await navigator.serviceWorker.register("/uv.sw.js", {
      scope: "/"
    });

    await navigator.serviceWorker.ready;

    const proxiedURL =
      __uv$config.prefix +
      __uv$config.encodeUrl(TARGET_SITE);

    frame.src = proxiedURL;

    frame.addEventListener("load", () => {
      loading.style.display = "none";
    }, { once: true });

  } catch (error) {
    console.error(error);
    loading.style.display = "none";
    errorBox.style.display = "block";
    errorBox.innerHTML =
      "<h2>Proxy failed to start</h2>" +
      "<p>Check the Railway deployment logs.</p>";
  }
}

startProxy();
