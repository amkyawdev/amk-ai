<template>
  <div class="main-page">
    <header>
      <button class="icon-btn" @click="menuOpen = true">
        <i class="bi bi-list"></i>
      </button>
      <h1><span class="logo-icon">🟡</span>Amkyawdev-ai</h1>
      <button class="icon-btn" @click="$router.push('/api')">
        <i class="bi bi-gear"></i>
      </button>
    </header>
    
    <div class="usage-bar">
      <span><i class="bi bi-coin"></i> Tokens: <strong>{{ userStore.tokens }}/20</strong></span>
      <span><i class="bi bi-mic"></i> TTS: <strong>{{ userStore.tts }}/20s</strong></span>
    </div>
    
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
</script>

<style scoped>
.main-page {
  min-height: 100vh;
  background: var(--bg);
  padding-bottom: 60px;
}

header {
  height: 56px;
  background: var(--input);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
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
  font-size: 18px;
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
  margin-top: 56px;
  background: var(--card);
  padding: 12px 16px;
  display: flex;
  gap: 24px;
  font-size: 13px;
  color: var(--text-secondary);
}

.usage-bar strong {
  color: var(--gold);
}

.menu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 16px;
}

.menu-card {
  background: var(--card);
  border-radius: 16px;
  padding: 24px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-card:active {
  transform: scale(0.96);
}

.menu-card i {
  font-size: 2rem;
  color: var(--gold);
  margin-bottom: 8px;
  display: block;
}

.menu-card span {
  font-size: 14px;
  color: var(--text);
}
</style>
