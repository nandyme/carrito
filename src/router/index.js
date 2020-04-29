import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Index,
    meta: {
      auth: true
    }
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser;
  let authentication = to.matched.some(record => record.meta.auth)

  if (authentication && !usuario) {
    next('login')
  } else if (!authentication && user) {
    next('home')
  } else {
    next()
  }
})

export default router
