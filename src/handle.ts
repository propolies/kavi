import type { Handle } from "@sveltejs/kit"
import { middleware } from "./middleware"

export const createHandle = (router: any): Handle => {
  return async ({ event, resolve }) => {
    const { searchParams, pathname } = event.url
    const api = searchParams.get('api')
  
    if (pathname.startsWith('/') && api) {
      if (api === "getRouterKeys") {
        const keys = getDeepKeys(router)
        return new Response(JSON.stringify(keys))
      }
      
      middleware.event = event
      let reqBody = await event.request.json().catch(() => '')
      
      const body = await nestedCall(api.split("."), router, reqBody)
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

const nestedCall = async (path: string[], router: (...args: unknown[]) => unknown | object, params: unknown): Promise<unknown> => {
  const [route, ...rest] = path
  router = router[route as keyof typeof router]
  if (!rest.length) return router(params)
  return nestedCall(rest, router, params)
}

type NestedObj = {[key: string]: NestedObj | unknown}
const getDeepKeys = (obj: object) => {
  let res: NestedObj = {}

  Object.entries(obj).forEach(([ key, value ]) => {
    if (typeof value == "object") {
      res[key] = getDeepKeys(value)
    } else {
      res[key] = ""
    }
  })
  return res
}