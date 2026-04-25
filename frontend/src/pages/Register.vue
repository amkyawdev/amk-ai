<template>
  <div class="auth-page">
    <div class="card">
      <div class="logo"><i class="bi bi-person-plus"></i></div>
      <h2>Create Account</h2>
      <p class="subtitle">Join Amkyawdev-ai</p>
      <form @submit.prevent="handleRegister">
        <div class="input-group"><label>Username</label><input v-model="form.username" type="text" placeholder="username" required></div>
        <div class="input-group"><label>Email</label><input v-model="form.email" type="email" placeholder="your@email.com" required></div>
        <div class="input-group"><label>Password</label><input v-model="form.password" type="password" placeholder="••••••••" required></div>
        <button type="submit" class="btn btn-primary">Create Account</button>
      </form>
      <p class="link">Have account? <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
const router = useRouter()
const userStore = useUserStore()
const form = reactive({ username: '', email: '', password: '' })
const handleRegister = () => {
  userStore.login({ username: form.username, email: form.email })
  router.push('/main')
}
</script>
<style scoped>
.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background: linear-gradient(180deg, rgba(255,215,0,0.05) 0%, var(--bg) 50%); }
.card { background: var(--card); border-radius: 16px; padding: 24px; width: 100%; max-width: 360px; }
.logo { width: 60px; height: 60px; background: linear-gradient(135deg, var(--gold), var(--gold-dark)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.logo i { font-size: 1.5rem; color: #000; }
h2 { color: var(--gold); text-align: center; font-size: 20px; }
.subtitle { color: var(--text-secondary); font-size: 13px; text-align: center; margin-bottom: 20px; }
.input-group { margin-bottom: 12px; }
.input-group label { display: block; color: var(--gold); font-size: 12px; font-weight: 600; margin-bottom: 6px; }
.input-group input { width: 100%; background: var(--input); border: none; color: var(--text); padding: 12px; border-radius: 4px; }
.btn { width: 100%; padding: 12px; border-radius: 20px; font-weight: 700; font-size: 13px; cursor: pointer; margin-top: 8px; }
.btn-primary { background: var(--gold); color: #000; border: none; }
.link { text-align: center; margin-top: 16px; color: var(--text-secondary); font-size: 13px; }
.link a { color: var(--gold); }
</style>
