<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="title">Login</h1>
      <p class="subtitle">Sign in to AmkyawDev AI</p>
      <form @submit.prevent="login" class="form">
        <input v-model="email" type="email" placeholder="Email" class="input" />
        <input v-model="password" type="password" placeholder="Password" class="input" />
        <button type="submit" class="btn">Sign In</button>
      </form>
      <p class="footer">Don't have an account? <router-link to="/register">Register</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const email = ref('')
const password = ref('')
const login = () => { router.push('/') }
</script>

<style scoped>
.login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0a; padding: 20px; }
.login-card { background: #111; padding: 40px; border-radius: 16px; width: 100%; max-width: 400px; border: 1px solid #1a1a1a; }
.title { font-size: 28px; font-weight: 700; color: #10b981; text-align: center; margin-bottom: 8px; }
.subtitle { color: #666; text-align: center; margin-bottom: 32px; }
.form { display: flex; flex-direction: column; gap: 16px; }
.input { width: 100%; padding: 14px 16px; border-radius: 8px; border: 1px solid #1a1a1a; background: #0a0a0a; color: #fff; font-size: 14px; }
.input:focus { outline: none; border-color: #10b981; }
.btn { padding: 14px; border-radius: 8px; border: none; background: #10b981; color: #000; font-size: 14px; font-weight: 600; cursor: pointer; }
.btn:hover { background: #059669; }
.footer { text-align: center; color: #666; font-size: 14px; margin-top: 24px; }
.footer a { color: #10b981; text-decoration: none; }
</style>