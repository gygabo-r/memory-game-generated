const CACHE_NAME = 'memory-game-v1';
const STATIC_CACHE = 'memory-game-static-v1';
const RUNTIME_CACHE = 'memory-game-runtime-v1';

// Get base path for GitHub Pages deployment
const BASE_PATH = self.location.pathname.includes('/memory-game-generated/') ? '/memory-game-generated' : '';

const urlsToCache = [
  BASE_PATH + '/',
  BASE_PATH + '/index.html',
  BASE_PATH + '/manifest.json',
  BASE_PATH + '/icon-192.png',
  BASE_PATH + '/icon-512.png'
];

// Critical resources for immediate caching
const CRITICAL_RESOURCES = [
  BASE_PATH + '/index.html',
  BASE_PATH + '/',
  BASE_PATH + '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Service Worker: Main cache opened');
        return cache.addAll(urlsToCache);
      }),
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Service Worker: Static cache opened');
        return cache.addAll(CRITICAL_RESOURCES);
      })
    ]).catch((error) => {
      console.error('Service Worker: Cache failed', error);
    })
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (![CACHE_NAME, STATIC_CACHE, RUNTIME_CACHE].includes(cacheName)) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      clients.claim() // Take control of all clients immediately
    ])
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Handle different types of requests
  if (event.request.url.includes('/assets/') || 
      event.request.url.endsWith('.js') || 
      event.request.url.endsWith('.css')) {
    // Cache static assets aggressively
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  } else {
    // For other requests, try cache first, then network
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          
          return fetch(event.request).then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            const cacheName = event.request.url.includes('icon') ? STATIC_CACHE : CACHE_NAME;

            caches.open(cacheName)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }).catch(() => {
            // When offline, return cached index.html for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
        })
    );
  }
});