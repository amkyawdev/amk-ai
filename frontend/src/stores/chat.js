import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const loading = ref(false)
  const streaming = ref(false)
  
  const addMessage = (role, content) => {
    messages.value.push({ role, content, timestamp: Date.now() })
  }
  
  const clearMessages = () => {
    messages.value = []
  }
  
  // System prompt for Burme AI
  const systemPrompt = `
You are Burme AI Bot - a helpful AI assistant.

Guidelines:
- Always prioritize answering the question directly
- Be precise, accurate, and clear
- Use clean markdown with code blocks, lists, bold
- Text-to-speak: max 6 seconds per response
- Always be polite and warm, use these Burmese phrases when suitable:
  · "မင်္ဂလာပါဗျာ"
  · "ဟုတ်အကို"
  · "ဟုတ်ကဲ့ပါ"
  · "ခနလေးစောင့်ပေးပါနော်"
- Try to guess user's emotion and suggest helpful next steps
`

  return { messages, loading, streaming, addMessage, clearMessages, systemPrompt }
})
