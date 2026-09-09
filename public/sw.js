const CACHE = 'five-lives-neutral-v1';
const PUBLIC_ASSETS = ['/offline.html', '/icons/icon-192.png', '/icons/icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PUBLIC_ASSETS))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('five-lives-neutral-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('message', event => { if (event.data?.type === 'ACTIVATE_UPDATE') self.skipWaiting(); });
self.addEventListener('fetch', event => {
 const request = event.request;
 const url = new URL(request.url);
 if (request.method !== 'GET' || url.origin !== self.location.origin) return;
 if (request.mode === 'navigate') {
  event.respondWith(fetch(request).catch(async () => (await caches.match('/offline.html')) || Response.error()));
  return;
 }
 if (PUBLIC_ASSETS.includes(url.pathname) && !url.search) {
  event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
 }
});
