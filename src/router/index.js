import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/hello',
    component: () => import('@/views/Hello.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
