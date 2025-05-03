import AteezLocal from '../../data/local/ateez-member.js';
import HomePage from './home-page.js';

export default class HomePresenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async showAteez() {
    const members = await this.#model.getAllMembers();
    this.#view.showAteez(members);
  }
}
