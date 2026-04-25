<template>
  <div class="main-page">
    <!-- Header -->
    <header>
      <button class="menu-btn" @click="menuOpen = true"><i class="fas fa-bars"></i></button>
      <h1><i class="fas fa-robot"></i> Amkyawdev AI</h1>
      <button class="menu-btn" @click="$router.push('/api')"><i class="fas fa-cog"></i></button>
    </header>
    
    <!-- Usage Bar -->
    <div class="usage-bar">
      <span><i class="fas fa-coins"></i> Tokens: <strong>{{ userStore.tokens }}/20</strong></span>
      <span><i class="fas fa-microphone"></i> TTS: <strong>{{ userStore.tts }}/20s</strong></span>
    </div>
    
    <!-- Menu Grid -->
    <div class="menu-grid">
      <div class="menu-item" @click="$router.push('/chat')">
        <i class="fas fa-comments"></i>
        <span>Chat</span>
      </div>
      <div class="menu-item" @click="$router.push('/api')">
        <i class="fas fa-key"></i>
        <span>API</span>
      </div>
      <div class="menu-item" @click="$router.push('/docs')">
        <i class="fas fa-book"></i>
        <span>Docs</span>
      </div>
      <div class="menu-item" @click="$router.push('/about')">
        <i class="fas fa-info-circle"></i>
        <span>About</span>
      </div>
    </div>
    
    <!-- Mobile Nav -->
    <MobileNav />
    
    <!-- Side Menu -->
    <div class="menu-overlay" :class="{ show: menuOpen }" @click="menuOpen = false"></div>
    <div class="side-menu" :class="{ show: menuOpen }">
      <div class="menu-header">
        <h3>Menu</h3>
        <button @click="menuOpen = false"><i class="fas fa-times"></i></button>
      </div>
      <div class="menu-link" @click="$router.push('/main'); menuOpen = false"><i class="fas fa-home"></i> Home</div>
      <div class="menu-link" @click="$router.push('/chat'); menuOpen = false"><i class="fas fa-comments"></i> Chat</div>
      <div class="menu-link" @click="$router.push('/api'); menuOpen = false"><i class="fas fa-key"></i> API Keys</div>
      <div class="menu-link" @click="$router.push('/docs'); menuOpen = false"><i class="fas fa-book"></i> Docs</div>
      <div class="menu-link" @click="$router.push('/about'); menuOpen = false"><i class="fas fa-info-circle"></i> About</div>
      <div class="menu-link logout" @click="handleLogout"><i class="fas fa-sign-out-alt"></i> Logout</div>
    </div>
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
.main-page { min-height: 100vh; background: var(--bg-dark); }

header {
  background: var(--bg-secondary);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

header h1 {
  font-size: 16px;
  color: var(--gold);
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-btn {
  background: none;
  border: none;
  color: var(--gold);
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
}

.usage-bar {
  background: var(--bg-secondary);
  padding: 12px 16px;
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: var(--text-secondary);
}

.usage-bar strong { color: var(--gold); }

.menu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 16px;
}

.menu-item {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.menu-item:active { transform: scale(0.97); }
.menu-item i { font-size: 2rem; color: var(--gold); margin-bottom: 8px; }
.menu-item span { font-size: 14px; }

.menu-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 200; display: none;
}
.menu-overlay.show { display: block; }

.side-menu {
  position: fixed; top: 0; left: 0; width: 280px; height: 100%;
  background: var(--bg-secondary); z-index: 201;
  transform: translateX(-100%); transition: 0.3s; padding: 20px;
}
.side-menu.show { transform: translateX(0); }

.menu-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 24px;
}
.menu-header h3 { color: var(--gold); }
.menu-header button { background: none; border: none; color: var(--text-secondary); font-size: 20px; cursor: pointer; }

.menu-link {
  display: flex; align-items: center; gap: 12px;
  padding: 14px; color: var(--text); border-radius: 10px; cursor: pointer;
}
.menu-link:hover { background: rgba(255,215,0,0.1); }
.menu-link i { color: var(--gold); width: 24px; }
.menu-link.logout { color: #ff4757; }
</style>
