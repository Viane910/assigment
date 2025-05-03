self.addEventListener('push', (event) => {
  console.log('Service worker pushing...');

  async function chainPromise() {
    await self.registration.showNotification('Ada laporan baru untuk Anda!', {
      body: 'Heboh hongjoong nikah sama admin!',
    });
  }

  event.waitUntil(chainPromise());
});
