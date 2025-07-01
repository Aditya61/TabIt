const CACHE_NAME = 'tabit-cache-v1';
const urlsToCache = [
    '/',
    '/offline',
    '/manifest.webmanifest',
    '/favicon.png',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET')
        return;

    event.respondWith(
        caches.match(event.request).then(response => {
            return (
                response || fetch(event.request, { redirect: 'follow' }).catch(() => 
                caches.match('/offline')
            )
            );
        })
    );
});