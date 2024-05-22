import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8080
  },
  plugins:[react()]
})
