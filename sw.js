// Service worker for 9M2PJU Ham Radio Dashboard - offline shell caching
const CACHE_NAME = "hamdash-v6";
const SHELL = [
  "./",
  "./index.html",
  "./config.js",
  "./wheelzoom.js",
  "./dashboard.js",
  "./styles.css",
  "./manifest.json",
  "./favicon.svg",
  "./seismic.html",
  "./greyline.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Only handle GET
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Network-first for same-origin navigations and config (so updates show up)
  if (url.origin === self.location.origin) {
    if (req.mode === "navigate" || url.pathname.endsWith("config.js")) {
      event.respondWith(
        fetch(req)
          .then((resp) => {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
            return resp;
          })
          .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
      );
      return;
    }
    // Cache-first for other same-origin assets
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
        return resp;
      }).catch(() => cached))
    );
    return;
  }

  // For cross-origin (images, iframes, RSS proxies) just pass through - don't cache
  event.respondWith(fetch(req).catch(() => new Response("", { status: 504 })));
});
