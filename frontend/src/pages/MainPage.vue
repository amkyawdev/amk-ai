<template>
  <div class="main-page">
    <!-- Header -->
    <header>
      <button class="icon-btn" @click="menuOpen = true">
        <i class="bi bi-list"></i>
      </button>
      <h1>
        <span class="logo-icon">🟡</span>
        Amkyawdev-ai
      </h1>
      <button class="icon-btn" @click="$router.push('/api')">
        <i class="bi bi-gear"></i>
      </button>
    </header>
    
    <!-- Usage Bar -->
    <div class="usage-bar">
      <span><i class="bi bi-coin"></i> Tokens: <strong>{{ userStore.tokens }}/20</strong></span>
      <span><i class="bi bi-mic"></i> TTS: <strong>{{ userStore.tts }}/20s</strong></span>
    </div>
    
    <!-- Menu Cards -->
    <div class="menu-grid">
      <div class="menu-card" @click="$router.push('/chat')">
        <i class="bi bi-chat-dots"></i>
        <span>Chat</span>
      </div>
      <div class="menu-card" @click="$router.push('/api')">
        <i class="bi bi-key"></i>
        <span>API</span>
      </div>
      <div class="menu-card" @click="$router.push('/docs')">
        <i class="bi bi-file-text"></i>
        <span>Docs</span>
      </div>
      <div class="menu-card" @click="$router.push('/about')">
        <i class="bi bi-person"></i>
        <span>About</span>
      </div>
    </div>
    
    <!-- Menu Overlay -->
    <div class="menu-overlay" :class="{ show: menuOpen }" @click="menuOpen = false"></div>
    <div class="side-menu" :class="{ show: menuOpen }">
      <div class="menu-header">
        <h3>Menu</h3>
        <button @click="menuOpen = false"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="menu-link" @click="$router.push('/main'); menuOpen = false">
        <i class="bi bi-house-door"></i> Home
      </div>
      <div class="menu-link" @click="$router.push('/chat'); menuOpen = false">
        <i class="bi bi-chat-dots"></i> Chat
      </div>
      <div class="menu-link" @click="$router.push('/api'); menuOpen = false">
        <i class="bi bi-key"></i> API Keys
      </div>
      <div class="menu-link" @click="$router.push('/docs'); menuOpen = false">
        <i class="bi bi-file-text"></i> Docs
      </div>
      <div class="menu-link" @click="$router.push('/about'); menuOpen = false">
        <i class="bi bi-person"></i> About
      </div>
      <div class="menu-link logout" @click="handleLogout">
        <i class="bi bi-box-arrow-right"></i> Logout
      </div>
    </div>
    
    <!-- Mobile Nav -->
    <MobileNav />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import MobileNav from '../components/MobileNav.vue'

const router = useRouter()
const userStore = useUserStore()
const menuOpen = ref(false)

const handleLogout = () => {
  userStore.logout()
  menuOpen.value = false
  router.push('/')
}
</script>

<style scoped>
.main-page {
  min-height: 100vh;
  background: var(--bg);
}

header {
  height: 50px;
  background: var(--input);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

header h1 {
  font-size: 16px;
  color: var(--gold);
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  font-size: 16px;
}

.icon-btn {
  background: none;
  border: none;
  color: var(--gold);
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
}

.usage-bar {
  margin-top: 50px;
  background: var(--input);
  padding: 8px 12px;
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: var(--text-secondary);
}

.usage-bar strong {
  color: var(--gold);
}

.menu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 12px;
}

.menu-card {
  background: var(--card);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.1s ease;
}

.menu-card:active {
  transform: scale(0.97);
}

.menu-card i {
  font-size: 2rem;
  color: var(--gold);
  margin-bottom: 8px;
  display: block;
}

.menu-card span {
  font-size: 14px;
}

/* Side Menu */
.menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  z-index: 200;
  display: none;
}

.menu-overlay.show {
  display: block;
}

.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 70%;
  height: 100%;
  background: var(--bg);
  z-index: 201;
  transform: translateX(-100%);
  transition: 0.3s ease;
  padding: 20px;
}

.side-menu.show {
  transform: translateX(0);
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.menu-header h3 {
  color: var(--gold);
}

.menu-header button {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 20px;
  cursor: pointer;
}

.menu-link {
  padding: 14px;
  color: var(--text);
  border-radius: 8px;
  cursor: pointer;
}

.menu-link:hover {
  background: rgba(255,215,0,0.1);
}

.menu-link i {
  color: var(--gold);
  margin-right: 12px;
}

.menu-link.logout {
  color: #ff6b6b;
}
</style>
