<template>
  <div class="auth-page">
    <div class="card">
      <div class="logo">
        <i class="bi bi-robot"></i>
      </div>
      <h2>Welcome Back</h2>
      <p class="subtitle">Login to continue</p>
      
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="your@email.com" required>
        </div>
        <div class="input-group">
          <label>Password</label>
          <input v-model="form.password" type="password" placeholder="••••••••" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      
      <p class="link">
        <router-link to="/reset">Forgot Password?</router-link>
      </p>
      
      <p class="link">
        Don't have account? 
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const checkDialogs = inject('checkDialogs')

const form = reactive({ email: '', password: '' })

const handleLogin = () => {
  if (!form.email || !form.password) return
  userStore.login({ username: form.email.split('@')[0], email: form.email })
  checkDialogs()
  router.push('/main')
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--bg);
  background: linear-gradient(180deg, rgba(255,215,0,0.05) 0%, var(--bg) 50%);
}

.card {
  background: var(--card);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 360px;
}

.logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.logo i {
  font-size: 1.5rem;
  color: #000;
}

h2 {
  color: var(--gold);
  text-align: center;
  font-size: 20px;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 13px;
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 12px;
}

.input-group label {
  display: block;
  color: var(--gold);
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  text-align: left;
}

.input-group input {
  width: 100%;
  background: var(--input);
  border: none;
  color: var(--text);
  padding: 12px;
  border-radius: 4px;
  font-size: 14px;
}

.input-group input:focus {
  outline: none;
  border: 1px solid var(--gold);
}

.btn {
  width: 100%;
  padding: 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.1s ease;
}

.btn:active {
  transform: scale(0.97);
}

.btn-primary {
  background: var(--gold);
  color: #000;
  border: none;
}

.link {
  text-align: center;
  margin-top: 16px;
  color: var(--text-secondary);
  font-size: 13px;
}

.link a {
  color: var(--gold);
  text-decoration: none;
}
</style>
