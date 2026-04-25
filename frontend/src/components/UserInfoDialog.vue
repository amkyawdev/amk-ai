<template>
  <div class="dialog-overlay" @click.self="$emit('close')">
    <div class="dialog">
      <div class="header">
        <h3><i class="bi bi-person"></i>Tell us about yourself</h3>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label>Name</label>
          <input v-model="form.username" type="text" placeholder="Your name" required>
        </div>
        <div class="input-group">
          <label>Age</label>
          <select v-model="form.age">
            <option value="">Select age</option>
            <option v-for="n in 63" :key="n" :value="n+17">{{ n+17 }}</option>
          </select>
        </div>
        <div class="input-group">
          <label>Interest</label>
          <input v-model="form.interest" type="text" placeholder="Your interest">
        </div>
        <button type="submit" class="btn btn-gold">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const emit = defineEmits(['close', 'save'])
const form = reactive({ username: '', age: '', interest: '' })
const handleSubmit = () => { emit('save', form) }
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

.input-group input,
.input-group select {
  width: 100%;
  background: var(--input);
  border: 2px solid transparent;
  color: var(--text);
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 14px;
}

.input-group input:focus,
.input-group select:focus {
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
</style>
