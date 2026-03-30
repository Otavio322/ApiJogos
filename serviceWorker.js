const CACHE_NAME = "magiccards-v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "/ApiJogos/",
        "/ApiJogos/index.html",
        "/ApiJogos/style.css",
        "/ApiJogos/script.js"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});