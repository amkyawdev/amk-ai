<template>
  <div class="app">
    <router-view />
    <UserInfoDialog v-if="showUserDialog" @close="showUserDialog = false" @save="onUserInfoSaved" />
    <StoragePermissionDialog v-if="showPermDialog" @close="showPermDialog = false" @save="onPermSaved" />
    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import { useUserStore } from './stores/user'
import UserInfoDialog from './components/UserInfoDialog.vue'
import StoragePermissionDialog from './components/StoragePermissionDialog.vue'

const userStore = useUserStore()
const showUserDialog = ref(false)
const showPermDialog = ref(false)
const toast = ref('')

const showToast = (msg) => {
  toast.value = msg
  setTimeout(() => toast.value = '', 3000)
}

provide('showToast', showToast)

const onUserInfoSaved = (userData) => {
  userStore.login(userData)
  showUserDialog.value = false
  showPermDialog.value = true
  showToast('Saved!')
}

const onPermSaved = (perms) => {
  userStore.setPermissions(perms)
  showPermDialog.value = false
  showToast('Welcome!')
}

onMounted(() => {
  if (userStore.isLoggedIn) {
    if (!userStore.user.username || !userStore.user.email) {
      showUserDialog.value = true
    } else if (!userStore.permissions.chatHistory && !userStore.permissions.voiceData && !userStore.permissions.fileStorage) {
      showPermDialog.value = true
    }
  }
})
</script>

<style>
:root {
  --gold: #FFD700;
  --gold-dark: #DAA520;
  --gold-light: #FFF8DC;
  --bg: #0A0A0A;
  --card: #1E1E1E;
  --input: #2C2F33;
  --text: #FFFFFF;
  --text-secondary: #B0B0B0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  position: relative;
}

.toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gold);
  color: #000;
  padding: 12px 24px;
  border-radius: 24px;
  font-weight: 600;
  font-size: 14px;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  background: var(--gold);
  border-radius: 2px;
}
</style>
