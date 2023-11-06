import type { RequestEvent } from "@sveltejs/kit"

class Middleware<Context extends object> {
  private getContext: () => Context

  constructor(ctx: () => Context) {
    this.getContext = ctx
  }

  use = <NewContext extends object>(createContext: (input: Context) => NewContext): Middleware<Context & NewContext> => {
    const getContext = this.getContext
    return new Middleware<Context & NewContext>(() => {
      return {
        ...getContext(),
        ...createContext(getContext())
      }
    });
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

  chain = <Ctx extends {event: RequestEvent}>(mw: Middleware<Ctx>) => {
    const getContext = this.getContext
    return new Middleware<Context & ReturnType<typeof mw.getContext>>(() => {
      return {
        ...getContext(),
        ...mw.getContext()
      }
    });
  }
}

type EventContext = { event: RequestEvent | undefined }
class EventMiddleware {
  event: RequestEvent | undefined

  use = <Context extends object>(createContext: (input: EventContext) => Context): Middleware<Context> => {
    const getEvent = () => this.event
    return new Middleware<Context & EventContext>(() => {
      return {
        event: getEvent(),
        ...createContext({ event: getEvent() })
      }
    });
  }
}

export const middleware = new EventMiddleware()
export const context = middleware.use(({ event }) => {
  if (!event) throw new Error("Event not found")
  return {
    event
  }
})
export type MiddlewareType = typeof middleware