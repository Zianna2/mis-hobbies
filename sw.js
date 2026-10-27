// Service Worker para Mis Hobbies PWA - Versión Cozy Cottagecore 6.0
const CACHE_NAME = 'hobbies-pwa-v6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './nature-data.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon.svg',
  './icon-autumn.svg',
  './icon-winter.svg',
  './icon-spring.svg',
  './icon-summer.svg',
  './icon-cottagecore.jpg',
  './art-crochet.jpg',
  './art-diamond.jpg',
  './art-reading.jpg',
  './art-plants.jpg',
  './nature-amanita-muscaria.jpg',
  './nature-boletus-edulis.jpg',
  './nature-lavandula-angustifolia.jpg',
  './nature-cantharellus-cibarius.jpg',
  './nature-monstera-deliciosa.jpg',
  './nature-osmunda-regalis.jpg',
  './nature-ganoderma-lucidum.jpg',
  './nature-vulpes-vulpes.jpg',
  './nature-erinaceus-europaeus.jpg',
  './nature-bubo-bubo.jpg',
  './nature-sciurus-vulgaris.jpg',
  './nature-erithacus-rubecula.jpg',
  './nature-lutra-lutra.jpg',
  './nature-cervus-elaphus.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
