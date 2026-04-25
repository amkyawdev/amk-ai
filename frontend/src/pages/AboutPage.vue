<template>
  <div class="about-page">
    <header class="header">
      <h1 class="title">AmkyawDev AI</h1>
      <nav class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/chat">Chat</router-link>
        <router-link to="/docs">Docs</router-link>
        <router-link to="/api">API</router-link>
        <router-link to="/login">Login</router-link>
      </nav>
    </header>
    <main class="content">
      <h2 class="page-title">About</h2>
      <div class="section">
        <h3>What is AmkyawDev AI?</h3>
        <p>AmkyawDev AI is an AI assistant powered by advanced language models.</p>
        <p>Built with modern technology for the best experience.</p>
      </div>
      <div class="section">
        <h3>Creator</h3>
        <p>Created by a passionate developer.</p>
        <p>Contact us at hello@amkyawdev.ai</p>
      </div>
      <div class="section">
        <h3>License</h3>
        <p>MIT License.</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.about-page { min-height: 100vh; background: #0a0a0a; }
.header { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; border-bottom: 1px solid #1a1a1a; }
.title { font-size: 24px; font-weight: 700; color: #10b981; }
.nav { display: flex; gap: 24px; }
.nav a { color: #888; text-decoration: none; font-size: 14px; }
.nav a:hover { color: #fff; }
.content { max-width: 800px; margin: 0 auto; padding: 60px 40px; }
.page-title { font-size: 36px; font-weight: 700; margin-bottom: 40px; color: #10b981; }
.section { background: #111; padding: 24px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #1a1a1a; }
.section h3 { font-size: 20px; margin-bottom: 12px; color: #fff; }
.section p { color: #888; line-height: 1.6; margin-bottom: 8px; }
</style>