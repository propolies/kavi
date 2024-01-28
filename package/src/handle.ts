import type { Handle } from "@sveltejs/kit"
import { ToAsync } from "./types.js"
import { BetterCookies } from "./cookies.js"
import { WebSocketServer } from "ws"

export function createHandle(router: object, wss?: WebSocketServer): Handle {
  if (wss) {
    wss.on("connection", (ws, req) => {
      console.log(`[wss:kit] client connected (singleton)`);
      ws.send("")
      ws.on('close', () => {
        console.log(`[wss:kit] client disconnected (singleton)`);
      });
    })
  }

  return async ({ event, resolve }) => {
    const { searchParams, pathname } = event.url
    const api = searchParams.get('api')
    
    if (!pathname.startsWith('/svelte-api') || !api) {
      return await resolve(event)
    }

    let reqBody = await event.request.json().catch(() => '')
    event.cookies = new BetterCookies(event.cookies)
    const route = findRoute(api.split("."), router)
    
    const body = await route(event, reqBody)
    return new Response(JSON.stringify(body ?? null), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': (event.cookies as BetterCookies).getSetCookies()
      }
    })
  }
}

type AnyFunc = (...args: unknown[]) => unknown
type MaybeRouter = AnyFunc | object

const findRoute = (path: string[], router: MaybeRouter): ToAsync<AnyFunc> => {
  const [route, ...rest] = path
  router = router[route as keyof typeof router]
  if (!rest.length) return router
  return findRoute(rest, router)
}