self.addEventListener('push', (event) => {
  let payload = {
    title: 'Notifikasi Baru!',
    options: {
      body: 'Ada notifikasi baru dari ATZstory.',
    },
  };

  try {
    if (event.data) {
      payload = event.data.json();
    }
  } catch (e) {
    payload.options.body = event.data.text();
  }

  event.waitUntil(self.registration.showNotification(payload.title, payload.options));
});
