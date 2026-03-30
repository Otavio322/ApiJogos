const CACHE_NAME = "magiccards-v1";

const urlsToCache = [
  "/ApiJogos/",
  "/ApiJogos/index.html",
  "/ApiJogos/style.css",
  "/ApiJogos/script.js",
  "/ApiJogos/manifest.json",
  "/ApiJogos/imagens/icon-192.png",
  "/ApiJogos/imagens/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cache aberto");
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});