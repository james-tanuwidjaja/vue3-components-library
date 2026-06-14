import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import { createJt } from '@james-tanuwidjaja/vue3-components';
import '@james-tanuwidjaja/vue3-components/styles';
import 'highlight.js/styles/github-dark.css';
import '@mdi/font/css/materialdesignicons.min.css';
import './assets/docs.css';

import App from './App.vue';
import { routes } from './router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, top: 80 };
    return { top: 0 };
  },
});

createApp(App).use(createJt()).use(router).mount('#app');
