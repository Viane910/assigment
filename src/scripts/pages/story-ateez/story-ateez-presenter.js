import * as DataAPI from '../../data/api';
import Map from '../../utils/map';
import 'leaflet/dist/leaflet.css';

const imageModel = {
  imageBlob: null,
  setImage(blob) {
    this.imageBlob = blob;
  },
  getImage() {
    return this.imageBlob;
  },
};

export default class StoryAteezPresenter {
  #videoElement;
  #mediaStream;
  async init() {
    const fileInput = document.getElementById('fileInput');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureBtn = document.getElementById('captureBtn');
    const previewImage = document.getElementById('previewImage');
    const submitBtn = document.getElementById('submitBtn');

    this.#videoElement = video;

    const map = L.map('map').setView([-6.175389, 106.827139], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    let marker = L.marker([-6.175389, 106.827139]).addTo(map);
    const latInput = document.getElementById('lat-input');
    const lonInput = document.getElementById('lon-input');
    const description = document.getElementById('description-input');

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      latInput.value = lat.toFixed(6);
      lonInput.value = lng.toFixed(6);
    });

    // Kamera
    try {
      this.#mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = this.#mediaStream;
      video.srcObject = this.#mediaStream;
      video.onloadedmetadata = () => {
        video.play();
        console.log('Kamera berhasil dimulai');
      };
      console.log('Elemen video:', video);
      console.log('MediaStream:', this.#mediaStream);
    } catch (err) {
      console.error('Kamera tidak tersedia:', err.message);
      alert('Kamera tidak tersedia. Silakan unggah foto secara manual.');
      document.getElementById('fileInput').style.display = 'block';
    }

    window.requestAnimationFrame(() => {
      const stopCam = document.getElementById('stopCam');
      if (stopCam) {
        stopCam.addEventListener('click', () => this.stop());
      }
    });

    // Upload
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          previewImage.src = reader.result;
          imageModel.setImage(file);
        };
        reader.readAsDataURL(file);
      }
    });

    // Capture
    captureBtn.addEventListener('click', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        previewImage.src = url;
        imageModel.setImage(blob);
      }, 'image/jpeg');
    });

    // Submit
    submitBtn.addEventListener('click', async () => {
      const formData = new FormData();
      formData.append('description', description.value);
      formData.append('photo', imageModel.getImage());
      formData.append('lat', latInput.value);
      formData.append('lon', lonInput.value);

      try {
        const response = await DataAPI.createStory(formData);
        if (response.ok) {
          alert('Laporan berhasil dikirim!');
        } else {
          alert('Gagal mengirim laporan. Silakan coba lagi.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengirim laporan.');
      }
    });
  }

  async stop() {
    if (this.#mediaStream instanceof MediaStream) {
      this.#mediaStream.getTracks().forEach((track) => track.stop());
    }

    if (this.#videoElement) {
      this.#videoElement.srcObject = null;
    }
  }
}
