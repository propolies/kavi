import type { Handle } from "@sveltejs/kit"
import { ToAsync } from "./types.js"
import { CookiesWrapper } from "./cookies.js"

export function createHandle(router: object): Handle {
  return async ({ event, resolve }) => {
    const { searchParams, pathname } = event.url
    const api = searchParams.get('api')
    
    if (!pathname.startsWith('/svelte-api') || !api) {
      return await resolve(event)
    }

    let reqBody = await event.request.json().catch(() => '')
    event.cookies = new CookiesWrapper(event.cookies)
    const route = findRoute(api.split("."), router)
    
    const args = reqBody ? [reqBody, event] : [event]
    let body: { data?: unknown, error?: string } = {}
    try {
      body.data = await route(...args)
    } catch (error) {
      if (error instanceof Error) {
        body.error = error.message
      }
    }
    return new Response(JSON.stringify(body ?? null), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': (event.cookies as CookiesWrapper).getSetCookies()
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