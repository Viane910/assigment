import SimpanStoryPresenter from '../simpan-story/simpan-story-presenter';

export default class SimpanStory {
  async render() {
    return `
      <section class="saved-page">
        <h2>Cerita Tersimpan</h2>
        <div id="saved-stories"></div>
      </section>
    `;
  }

  async afterRender() {
    this.presenter = new SimpanStoryPresenter(this);
    this.presenter.init();

    document.addEventListener('click', async (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const id = e.target.dataset.id;
        await this.presenter.deleteStory(id);
      }
    });
  }

  displayStories(stories) {
    const container = document.getElementById('saved-stories');
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
            <button class="delete-btn" data-id="${story.id}">Hapus</button>
          </div>
        `;
      })
      .join('');
  }

  showEmptyMessage() {
    document.getElementById('saved-stories').innerHTML = '<p>Belum ada cerita tersimpan.</p>';
  }
}
