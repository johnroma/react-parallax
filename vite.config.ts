import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase', // Use camelCase for local class names
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
  plugins: [react()],
  build: {
    sourcemap: true,
  },
})
