import { createHandle } from 'svelte-api'
import { router } from './sapi/router'
import { attachGlobalWSS } from 'svelte-api'
import { WebSocketServer } from 'ws'

const wss = attachGlobalWSS(new WebSocketServer({ noServer: true }))
export const handle = createHandle(router, wss)