import type { Handle } from "@sveltejs/kit"
import { CookiesProxy } from './cookies.js'
import { setHeadersProxy } from "./headers.js"
import type { AnyFunc } from "../../types.js"
import type { Options } from "../../options/options.js"
import { AnyError } from "../../result.js"

export function createHandle(router: object, options: Options): Handle {
  return async ({ event, resolve }) => {
    const api = event.url.searchParams.get('api')
    if (!event.url.pathname.startsWith('/kavi') || !api) {
      return await resolve(event)
    }

    const reqBody = options.devalue.parse(await event.request.text())
    event.cookies = new CookiesProxy(event.cookies)
    const headers: Record<string, string> = {}
    event.setHeaders = setHeadersProxy(headers)
    const route = findRoute(api.split("."), router)

    let body
    try {
      body = await route(...reqBody ? [reqBody, { event }] : [{ event }])
    } catch (e) {
      body = new AnyError(e)
    }
    return new Response(options.devalue.stringify(body), {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Set-Cookie': (event.cookies as CookiesProxy).getSetCookies(),
      }
    })
  }
}

type ToAsync<T extends AnyFunc> = T extends (...args: infer Args) => (Promise<infer R> | infer R)
  ? (...args: Args) => Promise<R>
  : never
type MaybeRouter = AnyFunc | object

function findRoute(path: string[], router: MaybeRouter): ToAsync<AnyFunc> {
  const [route, ...rest] = path
  router = router[route as keyof typeof router]
  if (!rest.length) return router
  return findRoute(rest, router)
}