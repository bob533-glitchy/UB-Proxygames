async function initProxy() {
  // Ensure the browser supports Service Workers
  if ("serviceWorker" in navigator) {
    try {
      // Register your Scramjet service worker
      await navigator.serviceWorker.register("/sw.js", {
        scope: "/service/" // Customize this prefix scope if needed
      });
      console.log("Scramjet Service Worker registered successfully!");
    } catch (err) {
      console.error("Scramjet Service Worker registration failed:", err);
    }
  }
}

// Function to handle launching a URL into the proxy
function launchURL(url) {
  if (!url) return;
  
  // Format or encode the URL based on your configuration preferences
  // Scramjet automatically catches requests passing through the scoped prefix
  const proxyPath = "/service/" + encodeURIComponent(url);
  window.location.href = proxyPath;
}

initProxy();