
// Minimal Service Worker for essential caching only
const CACHE_NAME = 'wordtoimage-minimal-v1';
const CRITICAL_ASSETS = [
  '/',
  '/src/index.css'
];

// Install - cache only critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CRITICAL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - minimal caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external URLs
  if (new URL(request.url).origin !== location.origin) return;

  // Cache-first for critical assets
  if (CRITICAL_ASSETS.includes(new URL(request.url).pathname)) {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request);
      })
    );
  }
});
