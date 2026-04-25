<template>
  <div class="main-page">
    <header class="header">
      <h1 class="title">AmkyawDev AI</h1>
      <nav class="nav">
        <router-link to="/chat">Chat</router-link>
        <router-link to="/docs">Docs</router-link>
        <router-link to="/api">API</router-link>
        <router-link to="/login">Login</router-link>
      </nav>
    </header>
    <main class="content">
      <div class="hero">
        <h2 class="hero-title">AI Assistant for Everyone</h2>
        <p class="hero-text">Your AI assistant powered by advanced language models</p>
        <div class="buttons">
          <router-link to="/chat" class="btn btn-primary">Get Started</router-link>
          <router-link to="/docs" class="btn btn-secondary">Learn More</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.main-page { min-height: 100vh; background: #0a0a0a; }
.header { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; border-bottom: 1px solid #1a1a1a; }
.title { font-size: 24px; font-weight: 700; color: #10b981; }
.nav { display: flex; gap: 24px; }
.nav a { color: #888; text-decoration: none; font-size: 14px; transition: color 0.2s; }
.nav a:hover { color: #fff; }
.content { display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 80px); padding: 40px; }
.hero { text-align: center; max-width: 600px; }
.hero-title { font-size: 48px; font-weight: 700; margin-bottom: 16px; background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-text { font-size: 18px; color: #666; margin-bottom: 32px; }
.buttons { display: flex; gap: 16px; justify-content: center; }
.btn { padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 500; transition: all 0.2s; }
.btn-primary { background: #10b981; color: #000; }
.btn-primary:hover { background: #059669; }
.btn-secondary { background: #1a1a1a; color: #fff; border: 1px solid #333; }
.btn-secondary:hover { border-color: #555; }
</style>