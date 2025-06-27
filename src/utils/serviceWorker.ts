
// Service Worker for caching and performance optimization
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

export const initServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('✅ Service Worker registered successfully');
      
      registration.addEventListener('updatefound', () => {
        console.log('🔄 Service Worker update found');
      });
    } catch (error) {
      console.warn('❌ Service Worker registration failed:', error);
    }
  }
};

export const preloadCriticalResources = (): void => {
  // Preload critical images
  CRITICAL_RESOURCES.forEach(resource => {
    if (resource.includes('.png') || resource.includes('.jpg')) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = resource;
      link.setAttribute('fetchpriority', 'high');
      document.head.appendChild(link);
    }
  });

  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'style';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
  fontLink.onload = function() {
    (this as HTMLLinkElement).rel = 'stylesheet';
  };
  document.head.appendChild(fontLink);
};

// Create service worker file content
export const createServiceWorkerFile = (): string => {
  return `
const CACHE_NAME = '${CACHE_NAME}';
const CRITICAL_CACHE = '${CRITICAL_CACHE}';

const CRITICAL_RESOURCES = ${JSON.stringify(CRITICAL_RESOURCES)};
const STATIC_RESOURCES = ${JSON.stringify(STATIC_RESOURCES)};

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CRITICAL_CACHE).then(cache => cache.addAll(CRITICAL_RESOURCES)),
      caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_RESOURCES))
    ])
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== CRITICAL_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        // Serve from cache
        return response;
      }
      
      // Fetch from network with fallback
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Cache successful responses
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      }).catch(() => {
        // Return offline fallback for HTML requests
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/');
        }
      });
    })
  );
});
`;
};
