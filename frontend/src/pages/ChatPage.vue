<template>
  <div class="chat-page">
    <header>
      <button class="icon-btn" @click="$router.push('/main')"><i class="bi bi-list"></i></button>
      <h1><span class="logo-icon">🟡</span>Amkyawdev-ai</h1>
      <button class="icon-btn"><i class="bi bi-gear"></i></button>
    </header>
    <div class="chat-messages" ref="messagesContainer">
      <div v-if="messages.length === 0" class="empty"><i class="bi bi-chat-dots"></i><p>Start a conversation</p></div>
      <div v-for="(msg, i) in messages" :key="i" class="message" :class="msg.role">
        <div class="bubble">{{ msg.content }}</div>
      </div>
      <div v-if="loading" class="message assistant">
        <div class="bubble typing"><span></span><span></span><span></span></div>
      </div>
    </div>
    <div class="input-area">
      <button class="icon-btn"><i class="bi bi-paperclip"></i></button>
      <input v-model="input" @keyup.enter="sendMessage" class="chat-input" placeholder="Type a message..." :disabled="loading">
      <button class="icon-btn"><i class="bi bi-mic"></i></button>
      <button class="send-btn" @click="sendMessage" :disabled="loading || !input.trim()"><i class="bi bi-send-fill"></i></button>
    </div>
    <div class="token-counter">{{ userStore.tokens }}/20 tokens</div>
    <MobileNav />
  </div>
</template>
<script setup>
import { ref, nextTick } from 'vue'
import { useUserStore } from '../stores/user'
import MobileNav from '../components/MobileNav.vue'
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
    const responses = [
      'ဟုတ်ကဲ့ပါ အစ်ကို။\n\n' + userMsg + '\n\nအတွက်ကျေးဇူးတင်ပါပါနော်။',
      'မင်္ဂလာပါဗျာ။\n\n' + userMsg + ' အတွက်ပါ။',
      'ဟုတ်အကို၊ သက်ဆိုင်တဲ့အဖြေပါပါနော်။\n\n' + userMsg
    ]
    const response = responses[Math.floor(Math.random() * responses.length)]
    messages.value.push({ role: 'assistant', content: response })
    userStore.decrementToken()
    loading.value = false
    scrollToBottom()
  }, 1500)
}
</script>
<style scoped>
.chat-page { display: flex; flex-direction: column; height: 100vh; background: var(--bg); }
header { height: 50px; background: var(--input); display: flex; align-items: center; justify-content: space-between; padding: 0 12px; position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
header h1 { font-size: 16px; color: var(--gold); display: flex; align-items: center; gap: 8px; }
.logo-icon { font-size: 16px; }
.icon-btn { background: none; border: none; color: var(--gold); font-size: 20px; cursor: pointer; padding: 8px; }
.chat-messages { flex: 1; overflow-y: auto; padding: 12px; padding-bottom: 110px; }
.empty { text-align: center; padding: 60px 20px; color: var(--text-secondary); }
.empty i { font-size: 3rem; color: var(--gold); opacity: 0.5; margin-bottom: 16px; }
.message { margin-bottom: 12px; display: flex; }
.message.user { justify-content: flex-end; }
.message.assistant { justify-content: flex-start; }
.bubble { max-width: 80%; padding: 12px 16px; border-radius: 16px; font-size: 14px; line-height: 1.5; }
.message.user .bubble { background: linear-gradient(135deg, var(--gold), var(--gold-dark)); color: #000; border-bottom-right-radius: 4px; }
.message.assistant .bubble { background: var(--card); color: var(--text); border-left: 3px solid var(--gold); border-bottom-left-radius: 4px; }
.typing { display: flex; gap: 4px; padding: 12px; }
.typing span { width: 8px; height: 8px; background: var(--gold); border-radius: 50%; animation: jump 0.5s infinite; }
.typing span:nth-child(2) { animation-delay: 0.15s; }
.typing span:nth-child(3) { animation-delay: 0.3s; }
@keyframes jump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.input-area { position: fixed; bottom: 50px; left: 0; right: 0; height: 50px; background: var(--input); display: flex; align-items: center; gap: 8px; padding: 0 12px; }
.chat-input { flex: 1; background: var(--input); border: 1px solid var(--gold); color: var(--text); padding: 10px 16px; border-radius: 30px; font-size: 14px; height: 40px; }
.chat-input:focus { outline: none; }
.send-btn { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--gold), var(--gold-dark)); border: none; color: #000; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.send-btn:disabled { opacity: 0.5; }
.send-btn:active { transform: scale(0.95); }
.token-counter { position: fixed; bottom: 100px; right: 12px; font-size: 12px; color: var(--text-secondary); z-index: 50; }
</style>
