<template>
  <div class="auth-page">
    <div class="card">
      <div class="logo">
        <i class="fas fa-robot"></i>
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
  
  // Simulate login
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
  background: linear-gradient(135deg, #0A0A0A, #1a1a2e);
}

.card {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 32px;
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
}

.subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  text-align: center;
  margin-bottom: 24px;
}

.input-group {
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  color: var(--gold);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}

.input-group input {
  width: 100%;
  background: #1a1a1a;
  border: 1px solid #444;
  color: var(--text);
  padding: 12px 16px;
  border-radius: 8px;
}

.input-group input:focus {
  outline: none;
  border-color: var(--gold);
}

.btn {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  color: #000;
  border: none;
}

.link {
  text-align: center;
  margin-top: 16px;
  color: var(--text-secondary);
  font-size: 14px;
}

.link a {
  color: var(--gold);
}
</style>
