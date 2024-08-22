const CACHE_NAME = 'v1';
const ASSET_CACHE_NAME = 'assets-v1';
const DATA_CACHE_NAME = 'data-v1';

const urlsToCache = [
  '/',            // Cache the root page
  '/index.html',  // Cache the index page
  '/styles.css',  // Cache your CSS files
  '/script.js',   // Cache your JavaScript files
  '/offline.html' // A custom offline page
];

// Install event: cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(ASSET_CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== ASSET_CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: serve cached assets and cache API responses
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Handle API requests (assuming they are under '/api/')
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME)
        .then((cache) => {
          return fetch(event.request)
            .then((response) => {
              // Cache the new API response
              cache.put(event.request, response.clone());
              return response;
            })
            .catch(() => {
              // Return the cached API response if network is unavailable
              return cache.match(event.request);
            });
        })
    );
  } else {
    // Handle asset requests
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
        .catch(() => {
          // If both cache and network fail, show a fallback page
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        })
    );
  }
});


  
  
  

