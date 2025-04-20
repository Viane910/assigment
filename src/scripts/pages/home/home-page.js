export default class HomePage {
  async render() {
    return `
      <section class="home-container">
      <div class="home-content">
      <img class="bg-ateez" src="./content/background-ateez.jpg" alt="ATEEZ" />
      <h1> ATEEZ Story from Aniteez Indonesia</h1>
      </div>
      </section>
    `;
  }

  async afterRender() {
    // Do your job here
  }
}
