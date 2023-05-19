import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"

const router = createRouter({
  routes: [
    {
      path: '/hellow',
      name: 'Hellow',
      component: () => import('@comp/HelloWorld.vue')
    },
    {
      path: '/apple',
      name: 'Apple',
      component: () => import('@comp/Apple.vue')
    },
    {
      path: '/map',
      name: 'Map',
      component: () => import('@views/map/Map.vue')
    }
  ],
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  if ( !to.name ) next({ name: 'Map' })
  else next()
})

export default router