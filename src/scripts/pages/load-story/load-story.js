import LoadStoryPresenter from './load-story-presenter';
import Map from '../../utils/map';
import 'leaflet/dist/leaflet.css';

export default class StoryAteezPage {
  #map = null;

  constructor() {
    this.presenter = new LoadStoryPresenter(this);
  }

  async render() {
    return `
    <section>
    <div class="story-list-container page-fade">
        <h2>Daftar Cerita</h2>
        <div class="reports-list__map__container">
          <div id="map" class="reports-list__map"></div>
          <div id="map-loading-container"></div>
        </div>
      </div>
    </section>
    <section>
    <div id="story-list" tabindex="0">Loading...</div>
    </section>
    `;
  }

  async afterRender() {
    await this.initialMap();
    await this.presenter.init();

    document.addEventListener('click', async (e) => {
      if (e.target.classList.contains('save-btn')) {
        const id = e.target.dataset.id;
        const stories = await this.presenter.getCurrentStories();
        const selectedStory = stories.find((story) => story.id === id);
        if (selectedStory) {
          await this.presenter.saveStory(selectedStory);
          alert('Cerita disimpan!');
        }
      }
    });
  }

  displayStories(stories) {
    const container = document.getElementById('story-list');
    if (!stories.length) {
      container.innerHTML = '<p>Tidak ada cerita.</p>';
      return;
    }

    container.innerHTML = stories
      .map((story) => {
        const photoUrl = story.photoUrl || 'default-image.jpg';
        return `
        <div class="story-item">
          <h3>${story.name}</h3>
          <img 
            src="${photoUrl}" 
            alt="Foto ${story.name}" 
            onerror="this.onerror=null;this.src='default-image.jpg';"
          />
          <p>${story.description}</p>
          <p>${story.lat} , ${story.lon}</p>
          <button class="save-btn" data-id="${story.id}">Simpan cerita</button>
        </div>
      `;
      })
      .join('');

    stories.forEach((story) => {
      if (this.#map && story.lat && story.lon) {
        const coordinate = [story.lat, story.lon];
        const markerOptions = { alt: story.name };
        const popupOptions = { content: story.description };
        this.#map.addMarker(coordinate, markerOptions, popupOptions);
      }
    });
  }

  async initialMap() {
    this.#map = await Map.build('#map', {
      zoom: 10,
      locate: true,
    });
  }

  showError(message) {
    const container = document.getElementById('story-list');
    container.innerHTML = `<p class="error">${message}</p>`;
  }
}
