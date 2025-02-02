import { RequestEvent } from "@sveltejs/kit"
import type { AsyncLocalStorage } from "node:async_hooks"
import type { WebSocketServer } from "ws"

declare global {
  namespace App {
    interface Locals {
      wss: WebSocketServer
    }
  }
  // only var works
  // eslint-disable-next-line no-var
  var ctx: { event: RequestEvent } | undefined
}

export {}
