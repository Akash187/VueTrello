import Vue from 'vue'
import Router from 'vue-router'
import Auth from './views/Auth.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth',
      name: 'authenticate',
      component: Auth
    }
    ,
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Board.vue')
    },
    {
      path: '/board/:id',
      name: 'board',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Board.vue')
    }
  ]
})
