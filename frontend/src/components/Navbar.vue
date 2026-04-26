<template>
  <nav class="navbar">
    <router-link to="/" class="nav-logo">AmkyawDev AI</router-link>
    <div class="nav-links">
      <router-link to="/docs">Docs</router-link>
      <router-link to="/api">API</router-link>
      <router-link to="/about">About</router-link>
      <template v-if="user">
        <router-link to="/chat" class="btn-chat">Chat</router-link>
        <button @click="logout" class="btn-logout">Logout</button>
      </template>
      <router-link v-else to="/login" class="btn-login">Login</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)

onMounted(() => {
  window.firebase.auth().onAuthStateChanged((u) => {
    user.value = u
  })
})

const logout = async () => {
  await window.firebase.auth().signOut()
  router.push('/login')
}
</script>

<style scoped>
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #0a0a0a; border-bottom: 1px solid #1a1a1a; }
.nav-logo { font-size: 16px; font-weight: 700; color: #10b981; text-decoration: none; }
.nav-links { display: flex; gap: 16px; align-items: center; }
.nav-links a { color: #666; text-decoration: none; font-size: 13px; }
.nav-links a:hover { color: #fff; }
.btn-login { background: #10b981; color: #000 !important; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 13px; }
.btn-chat { background: #10b981; color: #000 !important; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 13px; }
.btn-logout { background: #ef4444; color: #fff !important; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 13px; border: none; cursor: pointer; }
.btn-logout:hover { background: #dc2626; }
</style>