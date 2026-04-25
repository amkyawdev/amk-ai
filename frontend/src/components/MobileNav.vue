<template>
  <div class="mobile-nav">
    <div class="nav-item" @click="$router.push('/main')">
      <i class="fas fa-home"></i><span>Home</span>
    </div>
    <div class="nav-item" @click="$router.push('/chat')">
      <i class="fas fa-comments"></i><span>Chat</span>
    </div>
    <div class="nav-item" @click="$router.push('/api')">
      <i class="fas fa-key"></i><span>API</span>
    </div>
    <div class="nav-item" @click="$router.push('/about')">
      <i class="fas fa-info"></i><span>About</span>
    </div>
  </div>
</template>

<style scoped>
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-secondary);
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  border-top: 1px solid rgba(255,215,0,0.1);
  z-index: 100;
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 12px;
}
.nav-item i { font-size: 18px; }
.nav-item:hover { color: var(--gold); }
</style>
