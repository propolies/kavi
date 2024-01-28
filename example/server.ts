import { attachGlobalWSS, onHttpServerUpgrade } from 'svelte-api';
import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ noServer: true })
attachGlobalWSS(wss);

if (process.argv.includes("--dev")) {
  process.env.host = "localhost",
  process.env.port = "4173"
}
const { server } = await import('./build/index.js');
server.server.on('upgrade', onHttpServerUpgrade);