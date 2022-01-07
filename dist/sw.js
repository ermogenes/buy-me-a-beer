const cacheableAssets = [
  ".",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "apple-touch-icon.png",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "favicon.ico",
  "index.html",
  "index.js",
  "manifest.json",
  "maskable_icon_x512.png",
  "style.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("buy-me-a-beer-assets")
      .then((cache) => cache.addAll(cacheableAssets))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
