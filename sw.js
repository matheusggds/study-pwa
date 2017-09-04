var cacheName = 'weatherPWA-v2',
    filesToCache = [
        '/',
        '/styles/ud811.css',
        '/scripts/localforage.min.js',
        '/scripts/app.js',
        '/images/clear.png',
        '/images/cloudy_s_sunny.png',
        '/images/cloudy-scattered-showers.png',
        '/images/cloudy.png',
        '/images/fog.png',
        '/images/ic_add_white_24px.svg',
        '/images/ic_refresh_white_24px.svg',
        '/images/partly-cloudy.png',
        '/images/rain.png',
        '/images/scattered-showers.png',
        '/images/sleet.png',
        '/images/snow.png',
        '/images/thunderstorm.png',
        '/images/wind.png'
    ];

self.addEventListener('install', function (e) {
    console.log('[SERVICEWORKER] Install')
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[SERVICEWORKER] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[SERVICEWORKER] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[SERVICEWORKER] Removing old cache', key);
                    return caches.delete(key);
                }
            }))
        })
    );
});

self.addEventListener('fetch', function(e){
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return repsonse || fetch(e.request);
        })
    )
})