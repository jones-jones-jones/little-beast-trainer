const CACHE = "little-beast-v17";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "favicon.png", "logo.png", "whistle.wav", "clips/clip-1.m4a", "clips/clip-2.m4a", "clips/clip-3.m4a", "clips/clip-4.m4a", "clips/clip-5.m4a", "clips/clip-6.m4a"];

self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
));
self.addEventListener("fetch", e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
