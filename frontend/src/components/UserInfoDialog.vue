<template>
  <div class="dialog-overlay" @click.self="$emit('close')">
    <div class="dialog">
      <div class="header">
        <h3><i class="bi bi-person"></i>Tell us about yourself</h3>
        <button @click="$emit('close')"><i class="bi bi-x-lg"></i></button>
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
        <button type="submit" class="btn btn-primary">Save</button>
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
.dialog-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.dialog { background: var(--card); border-radius: 16px; border-top: 4px solid var(--gold); padding: 24px; width: 90%; max-width: 350px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.header h3 { color: var(--gold); font-size: 18px; }
.header button { background: none; border: none; color: var(--text-secondary); font-size: 20px; cursor: pointer; }
.input-group { margin-bottom: 12px; }
.input-group label { display: block; color: var(--gold); font-size: 12px; font-weight: 600; margin-bottom: 6px; }
.input-group input, .input-group select { width: 100%; background: var(--input); border: none; color: var(--text); padding: 12px; border-radius: 4px; }
.btn { width: 100%; padding: 12px; border-radius: 20px; font-weight: 700; font-size: 13px; cursor: pointer; margin-top: 8px; }
.btn-primary { background: var(--gold); color: #000; border: none; }
</style>
