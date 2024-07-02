import type { ViteDevServer, Plugin } from 'vite'
import type { IncomingMessage } from 'http'
import { parse } from 'url'
import type { Duplex } from 'stream'

export function onHttpServerUpgrade(req: IncomingMessage, sock: Duplex, head: Buffer) {
  const pathname = req.url ? parse(req.url).pathname : null
  if (pathname !== '/kavi-ws') return

  globalThis.wss.handleUpgrade(req, sock, head, (ws) => {
    globalThis.wss.emit('connection', ws, req)
  })
}

type PluginOptions = {
  logs?: boolean
}

const configure = (options?: PluginOptions) => (server: { httpServer: ViteDevServer["httpServer"] }) => {
  if (!server.httpServer) {
    console.log("[wss: server] failed to upgrade http server")
    return
  }
  if (options?.logs) {
    console.log("[wss: server] upgrading http server")
  }
  server.httpServer.on('upgrade', onHttpServerUpgrade)
}

export const wss = (options?: PluginOptions): Plugin => ({
  name: "wss",
  configurePreviewServer: configure(options),
  configureServer: configure(options)
})