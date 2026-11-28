// Offline cache for Mana Bhasha
const CACHE = "mb-v1";
const FILES = ["./", "index.html", "style.css", "app.js", "manifest.webmanifest", "icons/icon.svg",
  "icons/icon-192.png", "icons/icon-512.png",
  "fonts/noto-sans-telugu-telugu-400-normal.woff2", "fonts/noto-sans-telugu-telugu-700-normal.woff2",
  "fonts/noto-sans-telugu-latin-400-normal.woff2", "fonts/noto-sans-telugu-latin-700-normal.woff2"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
