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
    type Ctx = ReturnType<typeof this.getContext>
    return {
      call: <Return>(fn: (input: {ctx: Ctx, params: Params }) => Return) => {
        return (params: Params) => fn({
          params,
          ctx: this.getContext()
        })
      }
    }
  }

  call = <Return>(fn: (ctx: ReturnType<typeof this.getContext>) => Return) => {
    return () => fn(this.getContext())
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