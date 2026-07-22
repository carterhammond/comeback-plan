const CACHE = 'comeback-v2';
const ASSETS = [
  '/comeback-plan/',
  '/comeback-plan/index.html',
  '/comeback-plan/manifest.json',
  '/comeback-plan/icon-192.png',
  '/comeback-plan/icon-512.png',
  '/comeback-plan/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/comeback-plan/index.html')))
  );
});
