import { WebSocketServer } from 'ws'
import { onHttpServerUpgrade } from './vite.js'

globalThis.wss = new WebSocketServer({
  noServer: true,
  clientTracking: false
})

export function handleUpgrade(server: any) {
  server.server.on('upgrade', onHttpServerUpgrade)
}