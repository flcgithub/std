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
    }
  ],
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  if ( !to.name ) next({ name: 'Hellow' })
  else next()
})

export default router