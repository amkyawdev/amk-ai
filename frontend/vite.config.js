import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'AmkyawDev AI',
        short_name: 'AmkyawDev',
        description: 'AI Assistant powered by advanced language models',
        theme_color: '#10b981',
        background_color: '#0a0a0a',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' },
          { src: 'favicon.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      external: ['firebase/auth', 'firebase/firestore']
    }
  }
})