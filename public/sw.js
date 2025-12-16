// Enhanced Service Worker for WordToImage PWA
const CACHE_VERSION = 'v2';
const STATIC_CACHE = `wordtoimage-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `wordtoimage-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `wordtoimage-images-${CACHE_VERSION}`;

// Critical assets to precache
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Precaching critical assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.error('[SW] Precache failed:', err))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName.startsWith('wordtoimage-') && 
                     ![STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE].includes(cacheName);
            })
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - smart caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests except for images
  if (url.origin !== location.origin) {
    // Cache external images (generated AI images)
    if (request.destination === 'image') {
      event.respondWith(
        caches.open(IMAGE_CACHE).then(cache => {
          return cache.match(request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return fetch(request).then(networkResponse => {
              // Only cache successful responses
              if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            }).catch(() => {
              // Return placeholder for failed image loads
              return new Response('', { status: 404 });
            });
          });
        })
      );
    }
    return;
  }

  // Skip API calls to Supabase functions
  if (url.pathname.includes('/functions/')) return;

  // HTML pages - Network first, fallback to cache
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then(cachedResponse => {
            return cachedResponse || caches.match('/');
          });
        })
    );
    return;
  }

  // Static assets (JS, CSS) - Cache first, fallback to network
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          // Update cache in background
          fetch(request).then(networkResponse => {
            if (networkResponse.ok) {
              caches.open(STATIC_CACHE).then(cache => {
                cache.put(request, networkResponse);
              });
            }
          }).catch(() => {});
          return cachedResponse;
        }
        return fetch(request).then(networkResponse => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Images - Cache first with network fallback
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then(networkResponse => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(IMAGE_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Default - Network with cache fallback
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Background sync for offline image generation requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-generations') {
    event.waitUntil(syncPendingGenerations());
  }
});

async function syncPendingGenerations() {
  // Handle pending generation requests when back online
  console.log('[SW] Syncing pending generations...');
}

// Push notifications support
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || 'Your image is ready!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    },
    actions: [
      { action: 'view', title: 'View Image' },
      { action: 'close', title: 'Close' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'WordToImage', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});
