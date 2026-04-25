import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'

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
    const auth = getAuth ? getAuth() : firebase.auth()
    const user = auth.currentUser
    if (!user) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router