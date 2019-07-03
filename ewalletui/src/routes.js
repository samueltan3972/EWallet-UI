// routes.js
import Vue from 'vue'
import Router from 'vue-router'
import { TokenService } from './services/storage.service'

Vue.use(Router)

const router = new
Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: require('./components/template/public.vue').default,
      children: [
        {
          path: '',
          name: 'home',
          component: require('./components/home.vue').default,
          meta: { public: true, title: 'home' }
        },
        {
          path: 'login',
          name: 'login',
          component: require('./components/login.vue').default,
          meta: { public: true, requiresGuest: true, title: 'login' }
        },
        {
          path: 'register',
          name: 'register',
          component: require('./components/register.vue').default,
          meta: { public: true, requiresGuest: true, title: 'register' }
        },
        {
          path: 'pay',
          name: 'pay',
          component: require('./components/customer/pay.vue').default,
          meta: { title: 'pay' }
        },
        {
          path: 'receive',
          name: 'receive',
          component: require('./components/customer/receive.vue').default,
          meta: { title: 'receive' }
        },
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard'
    },
    {
      path: '*',
      component: require('./components/error/404.vue').default,
      meta: { public: true, title: '404' }
    }
  ],
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.requiresGuest)
  const loggedIn = !!TokenService.getToken()

  if (!isPublic && !loggedIn) {
    return next({
      path:'/login',
      query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/')
  }

  next();
})

export default router;
