import StoryAteezPresenter from './story-ateez-presenter';
import 'leaflet/dist/leaflet.css';

export default class StoryAteez {
  async render() {
    return `
        <div class="form-container">
          <form id="new-form" class="new-form">

  <div class="form-control">
    <label for="description-input" class="new-form__description__title">Keterangan</label>

    <div class="new-form__description__container">
      <textarea
        id="description-input"
        name="description"
        placeholder="Masukkan Deskripsi"
        required
      ></textarea>
    </div>
  </div>
</form>

    <div class="container">
        <h2>Upload atau Ambil Gambar</h2>
      
        <input type="file" accept="image/*" id="fileInput" />
      
        <div class="camera-section">
            <video id="video" autoplay autoplay></video>
              <button id="captureBtn">Capture</button>
              <button id="stopCam" type="button">Stop Kamera</button>
              <canvas id="canvas" hidden></canvas>
            </div>
      
            <div class="preview">
              <h3>Preview:</h3>
              <img id="previewImage" />
            </div>
      
            <button id="submitBtn" type="button">Submit</button>
            <a href="#/load-story" id="lihat-cerita-ku" class="button-link">Lihat Cerita</a>
          </div>
          <div class="form-control">
  <div class="new-form__location__title">Lokasi</div>
  <div class="new-form__location__container">
    <div class="new-form__location__map__container">
      <div id="map" style="height: 300px; width: 100%; border: 1px solid #ccc;"></div>
      <div id="map-loading-container"></div>
    </div>
    <div class="new-form__location__lat-lng">
      <input id="lat-input" type="number" name="lat" value="-6.175389">
      <input id="lon-input" type="number" name="lon" value="106.827139">
    </div>
  </div>
</div>
        `;
  }

  async afterRender() {
    const presenter = new StoryAteezPresenter();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await presenter.init();
  }
}
