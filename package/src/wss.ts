import { parse } from 'url';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';
import type { WebSocket, WebSocketServer } from 'ws';
import type { ViteDevServer } from 'vite'
import type { ExtendedGlobal } from './types.js';

class Wss {
  private groups: { [key: string]: WebSocket[] } = {}
  private clients: WebSocket[] = []

  constructor(private wss: WebSocketServer) {
    wss.on("connection", (ws, req) => {
      ws.on("message", (event) => {
        const { path, group, data } = JSON.parse(event.toString()) as {
          path: string,
          group?: string,
          data: any
        }
        // call router with data (readyState === 1)
      })

      ws.on("close", () => {
        // remove client from clients and groups
      })
    })
  }

  joinGroup(ws: WebSocket, group: string) {
    this.groups[group]
      ? this.groups[group].push(ws)
      : this.groups[group] = [ws]
  }

  getGroup(group: string) {
    return this.groups[group]
  }
}

export function onHttpServerUpgrade(req: IncomingMessage, sock: Duplex, head: Buffer) {
  const pathname = req.url ? parse(req.url).pathname : null;
  if (pathname !== '/svelte-socket') return;
  console.log("UPGRADING")

  const wss = (globalThis as ExtendedGlobal).wss;

  wss.handleUpgrade(req, sock, head, (ws) => {
    console.log('[handleUpgrade] creating new connecttion');
    wss.emit('connection', ws, req);
  });
};

export function attachGlobalWSS(wss: WebSocketServer) {
  console.log("ATTACHING GLOBAL");
  (globalThis as ExtendedGlobal).wss = wss;
  return wss
}

export const wss = (wss: WebSocketServer) => ({
  name: "integratedWSS",
  configureServer(server: ViteDevServer) {
    console.log("server logging")
    attachGlobalWSS(wss)
    server.httpServer?.on('upgrade', onHttpServerUpgrade);
  }
})