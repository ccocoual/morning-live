import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import App from './App.vue';
import { store, key } from './store/index';
import { routes } from './routes';

import './index.css';

const router = createRouter({
  history: createWebHistory(),
  routes: routes as any[],
});

const app = createApp(App);

app.use(store, key);
app.use(router);

app.mount('#app');
