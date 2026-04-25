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
        <button type="submit" class="btn btn-gold">Login</button>
      </form>
      
      <p class="link">
        <router-link to="/register">Don't have account? Register</router-link>
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
const showToast = inject('showToast')

const form = reactive({ email: '', password: '' })

const handleLogin = () => {
  if (!form.email || !form.password) {
    showToast('Fill all fields')
    return
  }
  userStore.login({ username: form.email.split('@')[0], email: form.email })
  router.push('/main')
  showToast('Welcome back!')
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(180deg, rgba(255,215,0,0.08) 0%, var(--bg) 100%);
}

.card {
  background: var(--card);
  border-radius: 20px;
  padding: 32px;
  width: 100%;
  max-width: 360px;
}

.logo {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.logo i {
  font-size: 1.8rem;
  color: #000;
}

h2 {
  color: var(--gold);
  text-align: center;
  font-size: 22px;
  margin-bottom: 4px;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 13px;
  text-align: center;
  margin-bottom: 24px;
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

.input-group input {
  width: 100%;
  background: var(--input);
  border: 2px solid transparent;
  color: var(--text);
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.input-group input:focus {
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
  transition: all 0.2s;
}

.btn:active {
  transform: scale(0.97);
}

.btn-gold {
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  color: #000;
}

.link {
  text-align: center;
  margin-top: 20px;
  color: var(--text-secondary);
  font-size: 13px;
}

.link a {
  color: var(--gold);
  text-decoration: none;
}
</style>
