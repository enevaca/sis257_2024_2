import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/prueba',
      name: 'prueba',
      component: () => import('../views/PruebaView.vue')
    },
    {
      path: '/interpretes',
      name: 'interpretes',
      component: () => import('../views/InterpreteView.vue')
    }
  ]
})

export default router
