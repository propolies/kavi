import type { RequestEvent } from "@sveltejs/kit"

class Middleware<Context extends object & { event: RequestEvent | undefined }> {
  event: RequestEvent | undefined = undefined
  private getContext: () => Context

  constructor() {
    this.getContext = () => {
      return { event: this.event } as Context
    }
  }

  use<NewContext extends object>(createContext: (input: Context) => NewContext): Middleware<Context & NewContext> {
    const getContext = this.getContext
    const newMiddleware = new Middleware<Context & NewContext>();

    newMiddleware.getContext = () =>  {
      const context = getContext()
      return {
        ...context,
        ...createContext(context)
      }
    };
    return newMiddleware;
  }
  
  params = <Params>() => {
    return {
      call: <Return>(fn: (params: Params, ctx: Context) => Return) => {
        return (params: Params) => fn(params, this.getContext())
      }
    }
  }

  call = <Return>(fn: (ctx: Context) => Return) => {
    return () => fn(this.getContext())
  }

  chain = <Mw extends Middleware<any>>(mw: Mw) => {
    const getContext = this.getContext
    const newMiddleware = new Middleware<any>();

    newMiddleware.getContext = () =>  {
      return {
        ...getContext(),
        ...mw.getContext()
      }
    };
    return newMiddleware;
  }
}

export const middleware = new Middleware()
export const context = middleware.use(({ event }) => {
  if (!event) throw new Error("Event not found")
  
  return {
    event: event,
  }
})
export type MiddlewareType = typeof middleware