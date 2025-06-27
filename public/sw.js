
const CACHE_NAME = 'wordtoimage-ai-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/lovable-uploads/ba65fc79-7bc8-40f0-81b9-d5ea5bc8d35a.png',
  '/lovable-uploads/19295794-7457-41ec-9272-41faed11b055.png',
  '/lovable-uploads/317dfa28-3425-4dac-a167-343034ee797b.png',
  '/lovable-uploads/5780c58f-29ec-4462-a0eb-3ba9829bf938.png'
];

// Network-first resources
const NETWORK_FIRST = [
  '/api/',
  '/auth/',
  'https://api.replicate.com/',
  'https://api.runware.ai/'
];

// Cache-first resources
const CACHE_FIRST = [
  '/lovable-uploads/',
  'https://fonts.googleapis.com/',
  'https://fonts.gstatic.com/',
  'https://images.unsplash.com/'
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different caching strategies
  if (NETWORK_FIRST.some(pattern => request.url.includes(pattern))) {
    // Network first for API calls
    event.respondWith(networkFirst(request));
  } else if (CACHE_FIRST.some(pattern => request.url.includes(pattern))) {
    // Cache first for static assets
    event.respondWith(cacheFirst(request));
  } else {
    // Stale while revalidate for everything else
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network first failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/');
    }
    
    throw error;
  }
}

// Cache first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Cache first failed:', error);
    throw error;
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(DYNAMIC_CACHE);
      cache.then((c) => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle offline form submissions, image uploads, etc.
  console.log('Background sync triggered');
}

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/lovable-uploads/ba65fc79-7bc8-40f0-81b9-d5ea5bc8d35a.png',
    badge: '/lovable-uploads/ba65fc79-7bc8-40f0-81b9-d5ea5bc8d35a.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/lovable-uploads/ba65fc79-7bc8-40f0-81b9-d5ea5bc8d35a.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/lovable-uploads/ba65fc79-7bc8-40f0-81b9-d5ea5bc8d35a.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('WordToImage AI', options)
  );
});
