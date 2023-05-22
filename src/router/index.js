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
    },
    {
      path: '/homePage',
      name: 'HomePage',
      component: () => import('@views/homePage/Index.vue')
    }
  ],
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  if ( !to.name ) next({ name: 'HomePage' })
  else next()
})

export default router