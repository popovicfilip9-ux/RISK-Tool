import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/RISK-Tool/',
  build: {
    rollupOptions: {
      input: './main.jsx'
    }
  }
})
