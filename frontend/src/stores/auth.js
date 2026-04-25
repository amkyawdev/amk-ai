import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)

  const init = () => {
    firebase.auth().onAuthStateChanged((u) => {
      user.value = u
      loading.value = false
    })
  }

  const logout = async () => {
    await firebase.auth().signOut()
  }

  return { user, loading, init, logout }
})