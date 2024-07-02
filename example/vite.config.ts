import { sveltekit } from '@sveltejs/kit/vite'
import { wss } from 'kavi/server'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    wss({
      logs: true
    }),
    sveltekit(),
  ]
})


