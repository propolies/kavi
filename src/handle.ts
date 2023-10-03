import type { Handle } from "@sveltejs/kit"
import { middleware } from "./middleware"

export const createHandle = <Router extends Object>(router: Router): Handle => {
  return async ({ event, resolve }) => {
    const { searchParams, pathname } = event.url
    const api = searchParams.get('api')
  
    if (pathname.startsWith('/') && api) {
      if (api === "getRouterKeys") return new Response(JSON.stringify(Object.keys(router)))
      
      middleware.event = event
      let reqBody
      reqBody = await event.request.json().catch(() => '')
      // @ts-ignore
      const body = await router[api as keyof typeof router](reqBody)
  
      const { status, statusText, headers: responseHeaders } = await resolve(event)
  
      const headers = {
        status: status.toString(),
        statusText,
        'Content-Type': 'application/json',
        'Set-Cookie': responseHeaders.getSetCookie().join(";")
      }
      
      return new Response(JSON.stringify(body ?? null), { headers })
    }
  
    return await resolve(event)
  }
}
