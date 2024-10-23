import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/shuffle',
    name: 'shuffle',
    component: () => import(/* webpackChunkName: "shuffle" */ '../views/Shuffle.vue')
  },
  {
    path: '/workout',
    name: 'workout',
    component: () => import(/* webpackChunkName: "workout" */ '../views/Workout.vue')
  },
  //{
  //  path: '/favorites',
  //  name: 'favorites',
  //  component: () => import(/* webpackChunkName: "favorites" */ '../views/Favorites.vue')
  //}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
