import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/details/:filename',
    name: 'details',
    component: () => import('./../views/DetailsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
