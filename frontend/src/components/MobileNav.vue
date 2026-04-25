<template>
  <nav class="mobile-nav">
    <div class="nav-item" @click="$router.push('/main')">
      <i class="bi bi-house-door"></i>
    </div>
    <div class="nav-item" @click="$router.push('/chat')">
      <i class="bi bi-chat-dots"></i>
    </div>
    <div class="nav-item" @click="$router.push('/api')">
      <i class="bi bi-key"></i>
    </div>
    <div class="nav-item" @click="$router.push('/docs')">
      <i class="bi bi-file-text"></i>
    </div>
    <div class="nav-item" @click="$router.push('/about')">
      <i class="bi bi-person"></i>
    </div>
  </nav>
</template>

<style scoped>
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--gold);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: #000;
  font-size: 22px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.nav-item:active {
  transform: scale(0.9);
  background: rgba(0,0,0,0.1);
  border-radius: 50%;
}
</style>
