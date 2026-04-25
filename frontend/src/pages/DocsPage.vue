<template>
  <div class="page">
    <header><button class="menu-btn" @click="$router.push('/main')"><i class="fas fa-arrow-left"></i></button><h1><i class="fas fa-book"></i> Docs</h1><div style="width:40px"></div></header>
    <div class="content">
      <div class="card"><h4><i class="fas fa-rocket"></i> Getting Started</h4><p>Learn how to use Amkyawdev AI</p></div>
      <div class="card"><h4><i class="fas fa-code"></i> API Reference</h4><p>Integration guides</p></div>
      <div class="card"><h4><i class="fas fa-bolt"></i> Quick Tips</h4><p>Get the most out of AI</p></div>
    </div>
  </div>
</template>

<style scoped>
.page { min-height: 100vh; background: var(--bg-dark); }
header { background: var(--bg-secondary); padding: 16px; display: flex; align-items: center; justify-content: space-between; }
header h1 { font-size: 16px; color: var(--gold); display: flex; align-items: center; gap: 8px; }
.menu-btn { background: none; border: none; color: var(--gold); font-size: 18px; cursor: pointer; padding: 8px; }
.content { padding: 16px; }
.card { background: var(--bg-secondary); border-radius: 12px; padding: 16px; margin-bottom: 12px; }
.card h4 { color: var(--gold); margin-bottom: 8px; }
.card p { color: var(--text-secondary); font-size: 14px; }
</style>
