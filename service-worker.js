self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

workbox.precaching.precacheAndRoute(self.__precacheManifest);

// cache images/fonts
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg|ttf|woff)$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'assets',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 24 * 60 * 60
            }),
        ],
    })
);

// for css/js use cache first then network
workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-resources',
    })
);
