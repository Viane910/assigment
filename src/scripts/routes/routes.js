import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import StoryAnitez from '../pages/story-anitez/story-anitez';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/story-anitez': new StoryAnitez(),
};

export default routes;
