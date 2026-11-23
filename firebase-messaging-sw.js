/* Firebase Cloud Messaging background worker. */
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBFRuIUDgtQfhEJ1JHpDApKXMHmiXfH92Q',
  authDomain: 'generous-57731.firebaseapp.com',
  projectId: 'generous-57731',
  storageBucket: 'generous-57731.firebasestorage.app',
  messagingSenderId: '423444629961',
  appId: '1:423444629961:web:fbc0fa3be5ae2420354018',
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};
  const title = data.title || 'فراخك عندنا';
  const options = {
    body: data.body || 'لديك تحديث جديد من المتجر.',
    tag: data.tag || 'store-notification',
    data: { url: data.url || './' },
    dir: 'rtl',
    lang: 'ar',
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || './', self.location.href).href;
  event.waitUntil((async () => {
    const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of windows) {
      if (client.url.startsWith(self.registration.scope) && 'focus' in client) {
        await client.focus();
        if ('navigate' in client) await client.navigate(target);
        return;
      }
    }
    if (clients.openWindow) await clients.openWindow(target);
  })());
});
