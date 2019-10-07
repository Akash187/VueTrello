import Vue from 'vue'
import Router from 'vue-router'
import Auth from './views/Auth.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth',
      name: 'authenticate',
      component: Auth
    },
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/board/:id',
      name: 'board',
      component: () => import('./views/Board.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = null
  if(JSON.parse(localStorage.getItem('authUser'))){
    isAuthenticated = true
  }
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !isAuthenticated) {
    next('/auth');
  } else if (requiresAuth && isAuthenticated) {
    next()
  } else {
    if(isAuthenticated && to.path === '/auth'){
      next(from.path)
    }else{
      next()
    }
  }
});

export default router
