let cacheName = 'hello-pwa';
let filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

//Start service worker and cache all of the app's content

self.addEventListener('install', function(e) {
  e.waitUntil(
    cache.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

//serve cached content when offline
self.addEventListener('fetch',function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});