
const CACHE_NAME = 'wordtoimage-v1.2';
const CRITICAL_CACHE = 'wordtoimage-critical-v1.2';

const CRITICAL_RESOURCES = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  '/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png',
  '/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png'
];

const STATIC_RESOURCES = [
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
];

// Enhanced install event with better error handling
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(CRITICAL_CACHE)
        .then(cache => cache.addAll(CRITICAL_RESOURCES))
        .catch(err => console.warn('Failed to cache critical resources:', err)),
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(STATIC_RESOURCES))
        .catch(err => console.warn('Failed to cache static resources:', err))
    ]).then(() => {
      console.log('✅ Service Worker installed successfully');
      self.skipWaiting();
    })
  );
});

// Enhanced activate event with cache cleanup
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== CRITICAL_CACHE) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker activated');
      self.clients.claim();
    })
  );
});

// Enhanced fetch event with intelligent caching strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip non-http(s) requests
  if (!url.protocol.startsWith('http')) return;
  
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response if available
      if (response) {
        console.log('📦 Serving from cache:', event.request.url);
        return response;
      }
      
      // Fetch from network with enhanced error handling
      return fetch(event.request).then(response => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Cache successful responses
        const responseToCache = response.clone();
        const cacheName = CRITICAL_RESOURCES.includes(url.pathname) ? CRITICAL_CACHE : CACHE_NAME;
        
        caches.open(cacheName).then(cache => {
          cache.put(event.request, responseToCache);
          console.log('💾 Cached:', event.request.url);
        });
        
        return response;
      }).catch(error => {
        console.warn('🌐 Network fetch failed:', event.request.url, error);
        
        // Return offline fallback for HTML requests
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/').then(fallback => {
            return fallback || new Response('Offline - Please check your connection', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
        }
        
        // Return empty response for other failed requests
        return new Response('', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});

// Handle service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
