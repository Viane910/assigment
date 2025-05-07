import * as DataAPI from '../../data/api';
import { reportMapper } from '../../data/api-mapper';
import Database from '../../data/database';

export default class LoadStoryPresenter {
  #dbModel;

  constructor(view) {
    this.view = view;
    this.#dbModel = Database;
  }

  async init() {
    try {
      const token = localStorage.getItem('token');
      const response = await DataAPI.getAllStories({ token });

      if (response && response.listStory && response.listStory.length > 0) {
        this.currentStories = response.listStory;
        this.view.displayStories(response.listStory);
        console.log('Cerita berhasil disimpan ke IndexedDB');
      } else {
        this.view.showError('Tidak ada cerita tersedia.');
      }
    } catch (error) {
      console.error('Error loading stories:', error);

      const offlineStories = await this.#dbModel.getAllStories();
      if (offlineStories.length > 0) {
        console.log('Menampilkan cerita dari IndexedDB');
        this.view.displayStories(offlineStories);
      } else {
        this.view.showError('Gagal mengambil data cerita dan tidak ada data offline.');
      }
    }
  }

  saveStory(story) {
    return this.#dbModel.putStory(story);
  }

  getCurrentStories() {
    return this.currentStories || [];
  }
}
