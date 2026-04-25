<template>
  <div class="page">
    <header><button class="menu-btn" @click="$router.push('/main')"><i class="fas fa-arrow-left"></i></button><h1><i class="fas fa-info-circle"></i> About</h1><div style="width:40px"></div></header>
    <div class="content text-center">
      <div class="card">
        <div class="logo"><i class="fas fa-robot"></i></div>
        <h2>Amkyawdev AI</h2>
        <p class="version">Version 1.0.0</p>
        <p class="desc">Smart AI Assistant<br>Vue.js + Python</p>
        <a href="https://github.com/amkyawdev/burme" target="_blank" class="btn btn-primary">
          <i class="fab fa-github"></i> View on GitHub
        </a>
        <hr>
        <p class="footer">© 2024 Amkyawdev AI</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { min-height: 100vh; background: var(--bg-dark); }
header { background: var(--bg-secondary); padding: 16px; display: flex; align-items: center; justify-content: space-between; }
header h1 { font-size: 16px; color: var(--gold); display: flex; align-items: center; gap: 8px; }
.menu-btn { background: none; border: none; color: var(--gold); font-size: 18px; cursor: pointer; padding: 8px; }
.content { padding: 16px; }
.card { background: var(--bg-secondary); border-radius: 16px; padding: 24px; }
.logo { width: 80px; height: 80px; background: linear-gradient(135deg, var(--gold), var(--gold-dark)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
.logo i { font-size: 2.5rem; color: #000; }
h2 { color: var(--gold); margin-bottom: 8px; }
.version { color: var(--text-secondary); margin-bottom: 16px; }
.desc { color: var(--text-secondary); font-size: 14px; margin-bottom: 16px; }
.btn { display: inline-block; background: linear-gradient(135deg, var(--gold), var(--gold-dark)); color: #000; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600; margin-top: 8px; }
hr { border-color: rgba(255,215,0,0.2); margin: 20px 0; }
.footer { color: var(--text-secondary); font-size: 12px; }
</style>
