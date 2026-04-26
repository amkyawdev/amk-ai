import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('./pages/MainPage.vue') },
  { path: '/chat', name: 'chat', component: () => import('./pages/ChatPage.vue'), meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: () => import('./pages/Login.vue') },
  { path: '/register', name: 'register', component: () => import('./pages/Register.vue') },
  { path: '/docs', name: 'docs', component: () => import('./pages/DocsPage.vue') },
  { path: '/api', name: 'api', component: () => import('./pages/ApiPage.vue') },
  { path: '/about', name: 'about', component: () => import('./pages/AboutPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const user = firebase.auth().currentUser
      if (!user) {
        // Wait for auth to initialize
        await new Promise(resolve => {
          const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe()
            resolve(user)
          })
        })
        const finalUser = firebase.auth().currentUser
        if (!finalUser) {
          next('/login')
        } else {
          next()
        }
      } else {
        next()
      }
    } catch (e) {
      next('/login')
    }
  } else {
    next()
  }
})

export default router