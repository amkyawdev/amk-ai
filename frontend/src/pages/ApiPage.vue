<template>
  <div class="page">
    <header>
      <button class="icon-btn" @click="$router.push('/main')">
        <i class="bi bi-arrow-left"></i>
      </button>
      <h1><i class="bi bi-key"></i>API Keys</h1>
      <div style="width:40px;"></div>
    </header>
    
    <div class="content">
      <div class="card">
        <div class="input-group">
          <label>Groq API Key</label>
          <input v-model="api.groq" type="password" placeholder="gsk_...">
        </div>
        <div class="input-group">
          <label>Gemini API Key</label>
          <input v-model="api.gemini" type="password" placeholder="AI...">
        </div>
        <div class="input-group">
          <label>OpenAI API Key</label>
          <input v-model="api.openai" type="password" placeholder="sk-...">
        </div>
        <button class="btn btn-gold" @click="saveApi">Save Keys</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue'
const showToast = inject('showToast')
const api = reactive({ groq: '', gemini: '', openai: '' })

const saveApi = () => {
  localStorage.setItem('amk_api', JSON.stringify(api))
  showToast('API Keys saved!')
}
</script>

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
}

.input-group {
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  color: var(--gold);
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}

.input-group input {
  width: 100%;
  background: var(--input);
  border: 2px solid transparent;
  color: var(--text);
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 14px;
}

.input-group input:focus {
  outline: none;
  border-color: var(--gold);
}

.btn {
  width: 100%;
  padding: 14px;
  border-radius: 24px;
  font-weight: 700;
  font-size: 14px;
  border: none;
  cursor: pointer;
  margin-top: 8px;
}

.btn-gold {
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  color: #000;
}

.btn:active {
  transform: scale(0.97);
}
</style>
