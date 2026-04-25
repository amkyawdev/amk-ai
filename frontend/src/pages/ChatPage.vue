<template>
  <div class="chat-page">
    <header class="header">
      <h1 class="title">AmkyawDev AI</h1>
      <nav class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/docs">Docs</router-link>
        <router-link to="/api">API</router-link>
        <router-link to="/login">Login</router-link>
      </nav>
    </header>
    <main class="chat-main">
      <div class="messages">
        <div v-for="(msg, i) in messages" :key="i" :class="['message', msg.role]">
          <div class="message-avatar">{{ msg.role === 'user' ? 'U' : 'AI' }}</div>
          <div class="message-content">{{ msg.content }}</div>
        </div>
      </div>
      <div class="input-area">
        <input v-model="input" @keyup.enter="send" placeholder="Type your message..." class="input" />
        <button @click="send" class="btn-send">Send</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const input = ref('')
const messages = ref([{ role: 'assistant', content: 'Hello! I am AmkyawDev AI. How can I help you today?' }])
const send = () => {
  if (!input.value.trim()) return
  messages.value.push({ role: 'user', content: input.value })
  const userInput = input.value
  input.value = ''
  setTimeout(() => {
    messages.value.push({ role: 'assistant', content: 'I understand your message: "' + userInput + '"' })
  }, 500)
}
</script>

<style scoped>
.chat-page { min-height: 100vh; background: #0a0a0a; display: flex; flex-direction: column; }
.header { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; border-bottom: 1px solid #1a1a1a; }
.title { font-size: 24px; font-weight: 700; color: #10b981; }
.nav { display: flex; gap: 24px; }
.nav a { color: #888; text-decoration: none; font-size: 14px; }
.nav a:hover { color: #fff; }
.chat-main { flex: 1; display: flex; flex-direction: column; max-width: 800px; margin: 0 auto; width: 100%; padding: 20px; }
.messages { flex: 1; overflow-y: auto; padding: 20px 0; }
.message { display: flex; gap: 12px; margin-bottom: 16px; }
.message.user { flex-direction: row-reverse; }
.message-avatar { width: 36px; height: 36px; border-radius: 8px; background: #1a1a1a; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #10b981; }
.message.user .message-avatar { background: #10b981; color: #000; }
.message-content { max-width: 70%; padding: 12px 16px; border-radius: 12px; background: #1a1a1a; font-size: 14px; line-height: 1.5; }
.message.user .message-content { background: #10b981; color: #000; }
.input-area { display: flex; gap: 12px; padding: 20px 0; border-top: 1px solid #1a1a1a; }
.input { flex: 1; padding: 14px 20px; border-radius: 12px; border: 1px solid #1a1a1a; background: #0a0a0a; color: #fff; font-size: 14px; }
.input:focus { outline: none; border-color: #10b981; }
.btn-send { padding: 14px 28px; border-radius: 12px; border: none; background: #10b981; color: #000; font-size: 14px; font-weight: 600; cursor: pointer; }
.btn-send:hover { background: #059669; }
</style>