<template>
  <div class="dialog-overlay" @click.self="$emit('close')">
    <div class="dialog">
      <div class="header">
        <h3><i class="fas fa-user"></i> User Info</h3>
        <button @click="$emit('close')"><i class="fas fa-times"></i></button>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label>Username</label>
          <input v-model="form.username" type="text" placeholder="username" required>
        </div>
        <div class="input-group">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="email" required>
        </div>
        <div class="input-group">
          <label>Phone</label>
          <input v-model="form.phone" type="tel" placeholder="phone">
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const emit = defineEmits(['close', 'save'])
const form = reactive({ username: '', email: '', phone: '' })
const handleSubmit = () => { emit('save', { ...form }) }
</script>

<style scoped>
.dialog-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.dialog { background: var(--bg-secondary); border-radius: 16px; padding: 24px; width: 100%; max-width: 340px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.header h3 { color: var(--gold); font-size: 18px; }
.header button { background: none; border: none; color: var(--text-secondary); font-size: 18px; cursor: pointer; }
.input-group { margin-bottom: 16px; }
.input-group label { display: block; color: var(--gold); font-size: 13px; font-weight: 600; margin-bottom: 6px; }
.input-group input { width: 100%; background: #1a1a1a; border: 1px solid #444; color: var(--text); padding: 12px 16px; border-radius: 8px; }
.btn { width: 100%; padding: 14px; border-radius: 10px; font-weight: 600; cursor: pointer; }
.btn-primary { background: linear-gradient(135deg, var(--gold), var(--gold-dark)); color: #000; border: none; }
</style>
