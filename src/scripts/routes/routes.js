import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import LoginPage from '../data/login/login';
import RegisterPage from '../data/register/register';
import StoryAteez from '../pages/story-ateez/story-ateez';
import LoadStory from '../pages/load-story/load-story';
import SimpanStory from '../pages/simpan-story/simpan-story';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/story-ateez': new StoryAteez(),
  '/load-story': new LoadStory(),
  '/simpan-story': new SimpanStory(),
};

export default routes;
