import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"https://PrateekK-2001.github.io/weather",
  plugins: [react()],
})
