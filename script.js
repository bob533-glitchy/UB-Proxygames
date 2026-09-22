// Your Railway proxy server
const PROXY_SERVER =
    "https://tldgn-mathgames-production.up.railway.app";

// Your NORMAL TLD GAMES website
const TARGET_SITE =
    "https://YOUR-NORMAL-SITE-URL-HERE";

const proxyFrame = document.getElementById("proxyFrame");

// Send the normal website through the Railway proxy
const proxyURL =
    PROXY_SERVER +
    "/proxy?url=" +
    encodeURIComponent(TARGET_SITE);

// Display it
proxyFrame.src = proxyURL;
