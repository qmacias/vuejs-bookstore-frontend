import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/views/HomePage.vue'

/*
  Con Vite v2.7.0, los títulos dinámicos
  se puede implementar de manera diferente.
*/
const BASE_TITLE = "Biblioteca Online | ";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: `${BASE_TITLE}Inicio`,
      },
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/BooksPage.vue'),
      meta: {
        title: `${BASE_TITLE}Libros`,
      },
    },
    {
      path: '/authors',
      name: 'authors',
      component: () => import('../views/AuthorsPage.vue'),
      meta: {
        title: `${BASE_TITLE}Autores`,
      },
    },
  ],
});

export default router;
