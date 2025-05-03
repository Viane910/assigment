import { generateAteezItemTemplate } from '../../components/data-ateez.js';
import AteezLocal from '../../data/local/ateez-member.js';
import HomePresenter from './home-presenter.js';

export default class HomePage {
  #presenter = null;

  async render() {
    return `
      <div id="home-page" class="section-home">
        <div class="text-home">
          <h2>Selamat Datang di Atiny Story</h2>
          <p>Cerita Khusus Penggemar Ateez</p>
          <a href="#/load-story" class="btn">Lihat Cerita</a>
        </div>
      </div>
      <div id="ateez"></div>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      model: AteezLocal,
      view: this,
    });

    await this.#presenter.showAteez();
  }

  async showAteez(members) {
    const container = document.querySelector('#ateez');
    const membersHTML = members.map(generateAteezItemTemplate).join('');

    container.innerHTML = `
      <section class="section-ateez">
        <h2>Anggota Ateez</h2>
        <div class="member-item">${membersHTML}</div>
      </section>
    `;

    requestAnimationFrame(() => {
      const section = container.querySelector('.section-ateez');
      if (section) section.classList.add('show');
    });
  }
}
