<template>
  <div class="dialog-overlay" @click.self="$emit('close')">
    <div class="dialog">
      <div class="header">
        <h3><i class="bi bi-shield-check"></i>Permissions</h3>
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
      <button @click="handleSave" class="btn btn-gold">Allow</button>
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
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.dialog {
  background: var(--card);
  border-radius: 20px;
  border-top: 4px solid var(--gold);
  padding: 24px;
  width: 90%;
  max-width: 360px;
}

.header {
  margin-bottom: 20px;
}

.header h3 {
  color: var(--gold);
  font-size: 18px;
}

.switch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  background: var(--input);
  border-radius: 12px;
  margin-bottom: 10px;
}

.switch-item label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.switch-item label i {
  color: var(--gold);
}

.switch-item input {
  width: 48px;
  height: 26px;
}

.info {
  color: var(--text-secondary);
  font-size: 12px;
  margin: 16px 0;
}

.btn {
  width: 100%;
  padding: 14px;
  border-radius: 24px;
  font-weight: 700;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

.btn-gold {
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  color: #000;
}
</style>
