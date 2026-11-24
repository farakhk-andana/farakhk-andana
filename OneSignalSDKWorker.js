// عامل الخدمة الوحيد للمتجر: يخلي التطبيق قابل للتثبيت + يستقبل إشعارات OneSignal
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e){
  var u = new URL(e.request.url);
  if (u.origin !== self.location.origin || e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(function(){
    return new Response('لا يوجد اتصال بالإنترنت', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }));
});
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
