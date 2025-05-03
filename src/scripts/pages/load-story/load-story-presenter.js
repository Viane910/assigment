import * as DataAPI from '../../data/api';

export default class LoadStoryPresenter {
  constructor(view) {
    this.view = view;
  }

  async init() {
    try {
      const token = localStorage.getItem('token');
      const response = await DataAPI.getAllStories({ token });

      if (response && response.listStory && response.listStory.length > 0) {
        this.view.displayStories(response.listStory);
      } else {
        this.view.showError('Tidak ada cerita tersedia.');
      }
    } catch (error) {
      console.error('Error loading stories:', error);
      this.view.showError('Gagal mengambil data cerita.');
    }
  }
}
