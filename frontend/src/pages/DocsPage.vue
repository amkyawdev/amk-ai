<template>
  <div class="page">
    <header>
      <button class="icon-btn" @click="$router.push('/main')">
        <i class="bi bi-arrow-left"></i>
      </button>
      <h1><i class="bi bi-file-text"></i>Docs</h1>
      <div style="width:40px;"></div>
    </header>
    
    <div class="content">
      <div class="card">
        <i class="bi bi-rocket"></i>
        <h4>Getting Started</h4>
        <p>Learn how to use Amkyawdev-ai</p>
      </div>
      <div class="card">
        <i class="bi bi-code-slash"></i>
        <h4>API Reference</h4>
        <p>Integration guides</p>
      </div>
      <div class="card">
        <i class="bi bi-lightning-charge"></i>
        <h4>Quick Tips</h4>
        <p>Get the most out of AI</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--bg);
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

.icon-btn {
  background: none;
  border: none;
  color: var(--gold);
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
}

.content {
  padding: 16px;
  margin-top: 72px;
}

.card {
  background: var(--card);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 12px;
}

.card i {
  font-size: 1.5rem;
  color: var(--gold);
  margin-bottom: 8px;
  display: block;
}

.card h4 {
  color: var(--gold);
  font-size: 15px;
  margin-bottom: 4px;
}

.card p {
  color: var(--text-secondary);
  font-size: 13px;
}
</style>
