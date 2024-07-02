import { RequestEvent } from "@sveltejs/kit"
import type { WebSocketServer } from "ws"

declare global {
  namespace App {
    interface Locals {
      wss: WebSocketServer
    }
  }
  // only var works
  // eslint-disable-next-line no-var
  var wss: WebSocketServer,
  // eslint-disable-next-line no-var
  var _fetch: RequestEvent["fetch"]
}

export {}