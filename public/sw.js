// Service Worker for Portfolio Website - Caching Strategy
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/projects.html',
    '/services.html',
    '/blog.html',
    '/contact.html',
    '/styles.css',
    '/main.js',
    '/data/data.js',
    '/favicon/favicon.ico',
];

// Install event - cache critical assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache).catch(err => {
                console.log('Cache addAll error:', err);
                // Continue even if some resources fail to cache
            });
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Don't cache POST requests or external APIs
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            // Cache hit - return response
            if (response) {
                // Background update: fetch new version for next time
                fetch(event.request).then(freshResponse => {
                    if (freshResponse && freshResponse.status === 200) {
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, freshResponse.clone());
                        });
                    }
                }).catch(() => {
                    // Network error - continue with cached version
                });
                return response;
            }

            // Cache miss - try network
            return fetch(event.request)
                .then(response => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Cache successful responses
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });

                    return response;
                })
                .catch(() => {
                    // Network request failed and not in cache
                    // Return offline page if available
                    return caches.match('/404.html');
                });
        })
    );
});
