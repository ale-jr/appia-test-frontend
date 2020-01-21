import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      private: true
    }
  },
  {
    path: '*',
    redirect: '/dashboard'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  await store.dispatch('initUserFromLocalStorage')
  const { loggedIn } = store.getters

  console.log(to)

  if (to.meta.private && !loggedIn) {
    next({
      name: 'login',
      query: { from: to.name }
    })
  } else if (to.name === 'login' && loggedIn) {
    next({
      name: 'dashboard'
    })
  } else {
    next()
  }
})

export default router
