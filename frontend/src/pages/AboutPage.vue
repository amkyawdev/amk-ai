<template>
  <div class="page">
    <header><button class="icon-btn" @click="$router.push('/main')"><i class="bi bi-arrow-left"></i></button><h1><i class="bi bi-person"></i>About</h1><div style="width:40px"></div></header>
    <div class="content text-center">
      <div class="card">
        <div class="avatar"><i class="bi bi-robot"></i></div>
        <h2>Amkyawdev-ai</h2>
        <p class="version">Version 1.0.0</p>
        <p class="desc">Smart AI Assistant<br>Vue.js + Python</p>
        <a href="https://github.com/amkyawdev/amk-ai" target="_blank" class="btn btn-primary">
          <i class="bi bi-github"></i> View on GitHub
        </a>
        <hr>
        <p class="footer">© 2024 Amkyawdev AI</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.page { min-height: 100vh; background: var(--bg); }
header { height: 50px; background: var(--input); display: flex; align-items: center; justify-content: space-between; padding: 0 12px; position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
header h1 { font-size: 16px; color: var(--gold); display: flex; align-items: center; gap: 8px; }
.icon-btn { background: none; border: none; color: var(--gold); font-size: 18px; cursor: pointer; padding: 8px; }
.content { padding: 12px; margin-top: 50px; }
.card { background: var(--card); border-radius: 16px; padding: 24px; }
.avatar { width: 64px; height: 64px; background: linear-gradient(135deg, var(--gold), var(--gold-dark)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
.avatar i { font-size: 2rem; color: #000; }
h2 { color: var(--gold); margin-bottom: 8px; }
.version { color: var(--text-secondary); margin-bottom: 16px; }
.desc { color: var(--text-secondary); font-size: 14px; margin-bottom: 16px; }
.btn { display: inline-block; background: var(--gold); color: #000; padding: 12px 24px; border-radius: 20px; text-decoration: none; font-weight: 600; margin-top: 8px; }
hr { border-color: rgba(255,215,0,0.2); margin: 20px 0; }
.footer { color: var(--text-secondary); font-size: 12px; }
</style>
