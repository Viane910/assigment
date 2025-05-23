// CSS imports
import '../styles/styles.css';
import './components/data-ateez.js';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import App from './pages/app';
import { registerServiceWorker } from './utils';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
    skipLinkButton: document.getElementById('skip-link'),
  });
  await app.renderPage();
  registerServiceWorker();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});
