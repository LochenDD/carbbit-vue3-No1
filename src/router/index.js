import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/home')
      },
      {
        path: 'category/:id',
        component: () => import('@/views/category')
      },
      {
        path: 'category/sub/:id',
        component: () => import('@/views/category/sub.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/login/callback',
    component: () => import('@/views/login/callback')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

export default router
