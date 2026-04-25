<template>
  <div class="page">
    <header><button class="menu-btn" @click="$router.push('/main')"><i class="fas fa-arrow-left"></i></button><h1><i class="fas fa-key"></i> API Keys</h1><div style="width:40px"></div></header>
    <div class="content">
      <div class="card">
        <div class="input-group"><label>Groq API Key</label><input v-model="api.groq" type="password" placeholder="gsk_..."></div>
        <div class="input-group"><label>Gemini API Key</label><input v-model="api.gemini" type="password" placeholder="AI..."></div>
        <div class="input-group"><label>OpenAI API Key</label><input v-model="api.openai" type="password" placeholder="sk-..."></div>
        <button @click="saveApi" class="btn btn-primary">Save Keys</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const api = reactive({ groq: '', gemini: '', openai: '' })
const saveApi = () => { localStorage.setItem('amk_api', JSON.stringify(api)); alert('API Keys saved!') }
</script>

<style scoped>
.page { min-height: 100vh; background: var(--bg-dark); }
header { background: var(--bg-secondary); padding: 16px; display: flex; align-items: center; justify-content: space-between; }
header h1 { font-size: 16px; color: var(--gold); display: flex; align-items: center; gap: 8px; }
.menu-btn { background: none; border: none; color: var(--gold); font-size: 18px; cursor: pointer; padding: 8px; }
.content { padding: 16px; }
.card { background: var(--bg-secondary); border-radius: 16px; padding: 20px; }
.input-group { margin-bottom: 16px; }
.input-group label { display: block; color: var(--gold); font-size: 13px; font-weight: 600; margin-bottom: 6px; }
.input-group input { width: 100%; background: #1a1a1a; border: 1px solid #444; color: var(--text); padding: 12px 16px; border-radius: 8px; }
.btn { width: 100%; padding: 14px; border-radius: 10px; font-weight: 600; cursor: pointer; }
.btn-primary { background: linear-gradient(135deg, var(--gold), var(--gold-dark)); color: #000; border: none; }
</style>
