import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import SpotifyApi from './services/spotify.api.service';

export const routes = [
  {
    name: 'login',
    path: '/',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (SpotifyApi.isLogged()) {
        next('/home');
      } else {
        next();
      }
    },
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (SpotifyApi.isLogged()) {
        next();
      } else {
        next('/login');
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'login',
    },
  },
];
