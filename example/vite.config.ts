import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { wss } from 'svelte-api'
import { WebSocketServer } from 'ws';

export default defineConfig({
	plugins: [
    sveltekit(), 
    wss(new WebSocketServer({ noServer: true, clientTracking: false }))
  ]
});
