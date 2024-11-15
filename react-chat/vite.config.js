import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/2024-2-VK-EDU-Frontend-M-Seregin/",
  plugins: [react()],
  server: {
    https: {
      key: './certs/private-key.pem',
      cert: './certs/cert.pem'
    },
    port: 5173,
    proxy: {
      '/api': {
        target: `https://vkedu-fullstack-div2.ru`,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
