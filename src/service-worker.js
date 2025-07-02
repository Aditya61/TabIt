const CACHE_NAME = 'tabit-cache-v1';
const urlsToCache = [
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

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => 
            cachedResponse || fetch(request)
        )
    );
});

self.addEventListener('message', (event) =>{
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
})