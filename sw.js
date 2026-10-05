const CACHE='makola-v505';
const FILES=['./','./index.html','./science.html','./manifest.json'];
self.addEventListener('install',e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
 self.skipWaiting();
});
self.addEventListener('activate',e=>{
 e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>{if(k!==CACHE) return caches.delete(k)}))));
 self.clients.claim();
});
self.addEventListener('fetch',e=>{
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{caches.open(CACHE).then(c=>c.put(e.request,res.clone())); return res})));
});
