<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="title">Login</h1>
      <p class="subtitle">Sign in to AmkyawDev AI</p>
      <form @submit.prevent="login" class="form">
        <input v-model="email" type="email" placeholder="Email" class="input" />
        <input v-model="password" type="password" placeholder="Password" class="input" />
        <button type="submit" class="btn" :disabled="loading">{{ loading ? 'Loading...' : 'Sign In' }}</button>
      </form>
      <button @click="loginWithGoogle" class="btn btn-google">Continue with Google</button>
      <p v-if="error" class="error">{{ error }}</p>
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
const error = ref('')
const loading = ref(false)

const login = async () => {
  if (!email.value || !password.value) {
    error.value = 'Please enter email and password'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    router.push('/chat')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    await firebase.auth().signInWithPopup(provider)
    router.push('/chat')
  } catch (e) {
    error.value = e.message
  }
}
</script>

<style scoped>
.login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0a; padding: 20px; }
.login-card { background: #111; padding: 40px; border-radius: 16px; width: 100%; max-width: 400px; border: 1px solid #1a1a1a; }
.title { font-size: 28px; font-weight: 700; color: #10b981; text-align: center; margin-bottom: 8px; }
.subtitle { color: #666; text-align: center; margin-bottom: 32px; }
.form { display: flex; flex-direction: column; gap: 16px; }
.input { width: 100%; padding: 14px 16px; border-radius: 8px; border: 1px solid #1a1a1a; background: #0a0a0a; color: #fff; font-size: 14px; }
.input:focus { outline: none; border-color: #10b981; }
.btn { padding: 14px; border-radius: 8px; border: none; background: #10b981; color: #000; font-size: 14px; font-weight: 600; cursor: pointer; width: 100%; }
.btn:hover { background: #059669; }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-google { margin-top: 12px; background: #1a1a1a; color: #fff; border: 1px solid #333; }
.btn-google:hover { background: #222; }
.error { color: #ef4444; font-size: 14px; text-align: center; margin-top: 12px; }
.footer { text-align: center; color: #666; font-size: 14px; margin-top: 24px; }
.footer a { color: #10b981; text-decoration: none; }
</style>