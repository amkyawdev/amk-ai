import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('./pages/MainPage.vue') },
  { path: '/chat', name: 'chat', component: () => import('./pages/ChatPage.vue') },
  { path: '/login', name: 'login', component: () => import('./pages/Login.vue') },
  { path: '/register', name: 'register', component: () => import('./pages/Register.vue') },
  { path: '/docs', name: 'docs', component: () => import('./pages/DocsPage.vue') },
  { path: '/api', name: 'api', component: () => import('./pages/ApiPage.vue') },
  { path: '/about', name: 'about', component: () => import('./pages/AboutPage.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})