// Import the core Scramjet bundle
importScripts("/scram/scramjet.all.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      // Load necessary configurations dynamically
      await scramjet.loadConfig();
      
      // If Scramjet detects this path needs proxying, route it
      if (scramjet.route(event)) {
        return scramjet.fetch(event);
      }
      
      // Fallback to normal browser fetches for local site resources
      return fetch(event.request);
    })()
  );
});