self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
// مطلوب عشان كروم يعتبر الموقع تطبيق. الطلبات تروح للشبكة عادي (بيانات فايربيز دايماً حديثة)
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).catch(()=>new Response('لا يوجد اتصال بالإنترنت',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})))});
