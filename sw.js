// Offline cache for Mana Bhasha. Bump VERSION on every release.
const VERSION = "mb-v3";
const CORE = ["./", "index.html", "css/app.css", "js/content-te.js", "js/app.js", "art/chitti.svg",
  "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "audio/te/map.json",
  "fonts/noto-sans-telugu-telugu-400-normal.woff2", "fonts/noto-sans-telugu-telugu-700-normal.woff2",
  "fonts/noto-sans-telugu-latin-400-normal.woff2", "fonts/noto-sans-telugu-latin-700-normal.woff2"];
self.addEventListener("install", e => e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())));
// Cache-first; audio files are cached the first time they are played.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).then(res => {
    if (res.ok && new URL(e.request.url).origin === location.origin) { const cp = res.clone(); caches.open(VERSION).then(c => c.put(e.request, cp)); }
    return res;
  })));
});
