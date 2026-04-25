<template>
  <div class="dialog-overlay" @click.self="$emit('close')">
    <div class="dialog">
      <div class="header">
        <h3><i class="bi bi-shield-check"></i>Permissions</h3>
        <button @click="$emit('close')"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="switch-item">
        <label><i class="bi bi-chat-dots"></i>Save Chat History</label>
        <input v-model="perms.chatHistory" type="checkbox">
      </div>
      <div class="switch-item">
        <label><i class="bi bi-mic"></i>Voice Data</label>
        <input v-model="perms.voiceData" type="checkbox">
      </div>
      <div class="switch-item">
        <label><i class="bi bi-hdd-stack"></i>File Storage</label>
        <input v-model="perms.fileStorage" type="checkbox">
      </div>
      <p class="info">Daily: 20 tokens, 20s TTS</p>
      <button @click="handleSave" class="btn btn-primary">Allow</button>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const emit = defineEmits(['close', 'save'])
const perms = reactive({ chatHistory: true, voiceData: false, fileStorage: false })
const handleSave = () => { emit('save', { ...perms }) }
</script>
<style scoped>
.dialog-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.dialog { background: var(--card); border-radius: 16px; border-top: 4px solid var(--gold); padding: 24px; width: 90%; max-width: 350px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.header h3 { color: var(--gold); font-size: 18px; }
.header button { background: none; border: none; color: var(--text-secondary); font-size: 20px; cursor: pointer; }
.switch-item { display: flex; align-items: center; justify-content: space-between; padding: 14px; background: var(--input); border-radius: 8px; margin-bottom: 8px; }
.switch-item label { display: flex; align-items: center; gap: 10px; font-size: 14px; }
.switch-item label i { color: var(--gold); }
.switch-item input { width: 44px; height: 24px; appearance: none; background: #444; border-radius: 12px; position: relative; cursor: pointer; }
.switch-item input::before { content: ''; position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 50%; top: 2px; left: 2px; transition: 0.2s; }
.switch-item input:checked { background: var(--gold); }
.switch-item input:checked::before { left: 22px; }
.info { color: var(--text-secondary); font-size: 12px; margin: 16px 0; }
.btn { width: 100%; padding: 12px; border-radius: 20px; font-weight: 700; font-size: 13px; cursor: pointer; }
.btn-primary { background: var(--gold); color: #000; border: none; }
</style>
