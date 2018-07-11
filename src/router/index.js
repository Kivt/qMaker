import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login')
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: () => import('@/views/SignUp')
    },
    {
      path: '/',
      component: () => import('@/views/Private'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Home')
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/views/Profile')
        },
        {
          path: 'create',
          name: 'create-questions', 
          component: () => import('@/views/CreateQuestions'),
          props: true
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('/login')
  else if (!requiresAuth && currentUser) next('/')
  else next()
})

export default router