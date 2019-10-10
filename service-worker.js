workbox.setConfig({
    debug: false
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest);

// cache images/fonts
workbox.routing.registerRoute(
    /^https?\.(png|gif|jpg|jpeg|webp|svg|ttf|woff)$/,
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

