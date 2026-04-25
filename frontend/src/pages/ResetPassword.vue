<template>
  <div class="auth-page">
    <div class="card">
      <div class="logo"><i class="fas fa-key"></i></div>
      <h2>Reset Password</h2>
      <p class="subtitle">We'll send you a reset link</p>
      <form @submit.prevent="handleReset">
        <div class="input-group">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="your@email.com" required>
        </div>
        <button type="submit" class="btn btn-primary">Send Reset Link</button>
      </form>
      <p class="link"><router-link to="/login">Back to Login</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const form = reactive({ email: '' })
const handleReset = () => { alert('Reset link sent!') }
</script>

<style scoped>
.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background: linear-gradient(135deg, #0A0A0A, #1a1a2e); }
.card { background: var(--bg-secondary); border-radius: 16px; padding: 32px; width: 100%; max-width: 360px; }
.logo { width: 60px; height: 60px; background: linear-gradient(135deg, var(--gold), var(--gold-dark)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.logo i { font-size: 1.5rem; color: #000; }
h2 { color: var(--gold); text-align: center; }
.subtitle { color: var(--text-secondary); font-size: 14px; text-align: center; margin-bottom: 24px; }
.input-group { margin-bottom: 16px; }
.input-group label { display: block; color: var(--gold); font-size: 13px; font-weight: 600; margin-bottom: 6px; }
.input-group input { width: 100%; background: #1a1a1a; border: 1px solid #444; color: var(--text); padding: 12px 16px; border-radius: 8px; }
.btn { width: 100%; padding: 14px; border-radius: 10px; font-weight: 600; cursor: pointer; }
.btn-primary { background: linear-gradient(135deg, var(--gold), var(--gold-dark)); color: #000; border: none; }
.link { text-align: center; margin-top: 16px; color: var(--gold); font-size: 14px; }
</style>