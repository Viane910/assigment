import { openDB } from 'idb';

const DATABASE_NAME = 'AtzDB';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'saved-reports';

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade: (database) => {
    database.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: 'id',
    });
  },
});

const Database = {
  async putStory(story) {
    if (!Object.hasOwn(story, 'id')) throw new Error('`id` is required to save');
    return (await dbPromise).put(OBJECT_STORE_NAME, story);
  },

  async putStories(stories) {
    const db = await dbPromise;
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    for (const story of stories) {
      if (story.id) {
        tx.store.put(story);
      }
    }
    console.log('Cerita berhasil disimpan ke IndexedDB');
    return tx.done;
  },

  async getAllStories() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async deleteStory(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default Database;
