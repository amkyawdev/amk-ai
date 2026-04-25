<template>
  <div class="app">
    <nav class="navbar" v-if="!isAuthPage">
      <router-link to="/" class="nav-logo">AmkyawDev AI</router-link>
      <div class="nav-links">
        <router-link to="/docs">Docs</router-link>
        <router-link to="/api">API</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/chat" v-if="user" class="btn-chat">Chat</router-link>
        <router-link to="/login" v-else class="btn-login">Login</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'

const route = useRoute()
const auth = useAuthStore()

const user = computed(() => auth.user)
const isAuthPage = computed(() => route.path === '/login' || route.path === '/register')
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #fff; }
.app { min-height: 100vh; }
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background: #0a0a0a; border-bottom: 1px solid #1a1a1a; }
.nav-logo { font-size: 18px; font-weight: 700; color: #10b981; text-decoration: none; }
.nav-links { display: flex; gap: 24px; align-items: center; }
.nav-links a { color: #666; text-decoration: none; font-size: 14px; }
.nav-links a:hover { color: #fff; }
.btn-login { background: #10b981; color: #000 !important; padding: 8px 16px; border-radius: 6px; font-weight: 600; }
.btn-chat { background: #10b981; color: #000 !important; padding: 8px 16px; border-radius: 6px; font-weight: 600; }
</style>