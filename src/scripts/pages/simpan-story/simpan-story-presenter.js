import Database from '../../data/database';

export default class SimpanStoryPresenter {
  constructor(view) {
    this.view = view;
    this.dbModel = Database;
  }

  async init() {
    const stories = await this.dbModel.getAllStories();
    if (stories.length > 0) {
      this.view.displayStories(stories);
    } else {
      this.view.showEmptyMessage();
    }
  }

  async deleteStory(id) {
    await this.dbModel.deleteStory(id);
    const updatedStories = await this.dbModel.getAllStories();
    this.view.displayStories(updatedStories);
  }
}
