import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref({ username: '', email: '', age: '', interest: '' })
  const permissions = ref({ chatHistory: true, voiceData: false, fileStorage: false })
  const isLoggedIn = ref(false)
  const tokens = ref(20)
  const tts = ref(20)

  const login = (userData) => {
    user.value = { ...user.value, ...userData }
    isLoggedIn.value = true
    localStorage.setItem('amk_user', JSON.stringify(user.value))
  }

  const logout = () => {
    user.value = { username: '', email: '', age: '', interest: '' }
    isLoggedIn.value = false
    localStorage.removeItem('amk_user')
  }

  const setPermissions = (perms) => {
    permissions.value = { ...permissions.value, ...perms }
    localStorage.setItem('amk_perms', JSON.stringify(permissions.value))
  }

  const decrementToken = () => {
    if (tokens.value > 0) tokens.value--
  }

  const decrementTTS = (amount) => {
    if (tts.value >= amount) tts.value -= amount
  }

  // Load from localStorage
  const savedUser = localStorage.getItem('amk_user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
    isLoggedIn.value = true
  }

  const savedPerms = localStorage.getItem('amk_perms')
  if (savedPerms) {
    permissions.value = JSON.parse(savedPerms)
  }

  return { user, permissions, isLoggedIn, tokens, tts, login, logout, setPermissions, decrementToken, decrementTTS }
})
