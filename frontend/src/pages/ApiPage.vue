<template>
  <div class="page">
    <header><button class="icon-btn" @click="$router.push('/main')"><i class="bi bi-arrow-left"></i></button><h1><i class="bi bi-key"></i>API Keys</h1><div style="width:40px"></div></header>
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
.page { min-height: 100vh; background: var(--bg); }
header { height: 50px; background: var(--input); display: flex; align-items: center; justify-content: space-between; padding: 0 12px; position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
header h1 { font-size: 16px; color: var(--gold); display: flex; align-items: center; gap: 8px; }
.icon-btn { background: none; border: none; color: var(--gold); font-size: 18px; cursor: pointer; padding: 8px; }
.content { padding: 12px; margin-top: 50px; }
.card { background: var(--card); border-radius: 12px; padding: 16px; }
.input-group { margin-bottom: 12px; }
.input-group label { display: block; color: var(--gold); font-size: 12px; font-weight: 600; margin-bottom: 6px; }
.input-group input { width: 100%; background: var(--input); border: none; color: var(--text); padding: 12px; border-radius: 4px; }
.btn { width: 100%; padding: 12px; border-radius: 20px; font-weight: 700; font-size: 13px; cursor: pointer; }
.btn-primary { background: var(--gold); color: #000; border: none; }
</style>
