<template>
  <div class="chat-page">
    <header>
      <button class="menu-btn" @click="$router.push('/main')"><i class="fas fa-arrow-left"></i></button>
      <h1><i class="fas fa-comments"></i> Chat</h1>
      <button class="menu-btn"><i class="fas fa-cog"></i></button>
    </header>
    
    <div class="chat-messages" ref="messagesContainer">
      <div v-if="messages.length === 0" class="empty">
        <i class="fas fa-comments"></i>
        <p>Start a conversation</p>
      </div>
      <div v-for="(msg, i) in messages" :key="i" class="message" :class="msg.role">
        <div class="bubble">{{ msg.content }}</div>
      </div>
      <div v-if="loading" class="message assistant">
        <div class="bubble typing"><span></span><span></span><span></span></div>
      </div>
    </div>
    
    <div class="chat-input-area">
      <button class="upload-btn"><i class="fas fa-paperclip"></i></button>
      <input v-model="input" @keyup.enter="sendMessage" class="chat-input" placeholder="Type message..." :disabled="loading">
      <button class="send-btn" @click="sendMessage" :disabled="loading || !input.trim()">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const input = ref('')
const loading = ref(false)
const messages = ref([])
const messagesContainer = ref(null)

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!input.value.trim() || loading.value) return
  if (userStore.tokens <= 0) { alert('Token limit reached!'); return }
  
  const userMsg = input.value
  messages.value.push({ role: 'user', content: userMsg })
  input.value = ''
  loading.value = true
  scrollToBottom()
  
  setTimeout(() => {
    const response = `ဟုတ်ကဲ့ပါ အစ်ကို။\n\n${userMsg}\n\nအတွက်ကျေးဇူးတင်ပါပါနော်။\n\n**Burme AI Bot** ပါ။`
    messages.value.push({ role: 'assistant', content: response })
    userStore.decrementToken()
    loading.value = false
    scrollToBottom()
  }, 1500)
}
</script>

<style scoped>
.chat-page { display: flex; flex-direction: column; height: 100vh; background: var(--bg-dark); }
header { background: var(--bg-secondary); padding: 16px; display: flex; align-items: center; justify-content: space-between; }
header h1 { font-size: 16px; color: var(--gold); display: flex; align-items: center; gap: 8px; }
.menu-btn { background: none; border: none; color: var(--gold); font-size: 18px; cursor: pointer; padding: 8px; }
.chat-messages { flex: 1; overflow-y: auto; padding: 16px; }
.empty { text-align: center; padding: 60px 20px; color: var(--text-secondary); }
.empty i { font-size: 3rem; color: var(--gold); opacity: 0.5; margin-bottom: 16px; }
.message { margin-bottom: 12px; display: flex; }
.message.user { justify-content: flex-end; }
.message.assistant { justify-content: flex-start; }
.bubble { max-width: 80%; padding: 12px 16px; border-radius: 12px; font-size: 14px; line-height: 1.5; }
.message.user .bubble { background: linear-gradient(135deg, var(--gold), var(--gold-dark)); color: #000; border-bottom-right-radius: 4px; }
.message.assistant .bubble { background: var(--bg-secondary); border-bottom-left-radius: 4px; }
.typing { display: flex; gap: 4px; padding: 12px; }
.typing span { width: 8px; height: 8px; background: var(--gold); border-radius: 50%; animation: 1s infinite; }
.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes typing { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-8px); } }
.chat-input-area { background: var(--bg-secondary); padding: 16px; display: flex; gap: 10px; align-items: center; }
.chat-input { flex: 1; background: #1a1a1a; border: 1px solid #444; color: var(--text); padding: 12px 16px; border-radius: 24px; }
.chat-input:focus { outline: none; border-color: var(--gold); }
.upload-btn, .send-btn { background: linear-gradient(135deg, var(--gold), var(--gold-dark)); border: none; width: 44px; height: 44px; border-radius: 50%; color: #000; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.send-btn:disabled { opacity: 0.5; }
</style>
