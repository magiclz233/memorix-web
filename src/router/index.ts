import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'gallery',
          name: 'gallery',
          component: () => import('@/views/GalleryView.vue')
        },
        {
          path: 'timeline',
          name: 'timeline',
          component: () => import('@/views/TimelineView.vue')
        },
        {
          path: 'map',
          name: 'map',
          component: () => import('@/views/MapView.vue')
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/SettingsView.vue')
        }
      ]
    }
  ]
})

export default router 