import type { RequestEvent } from "@sveltejs/kit"
import type { Schema } from 'zod'

type SchemaReturn<T extends Schema> = T extends { parse: (...args: infer Args) => infer R }
  ? R
  : number

class Middleware<Context extends { event: RequestEvent }> {
  constructor(private getContext: (event: RequestEvent) => Context) {}

  use<NewContext extends object>(createContext: (input: Context) => NewContext): Middleware<Context & NewContext> {
    const getContext = this.getContext
    return new Middleware<Context & NewContext>((event: RequestEvent) => {
      return {
        ...getContext(event),
        ...createContext(getContext(event))
      }
    });
  }
  
  args<S extends Schema>(schema: S) {
    type Args = SchemaReturn<S>
    return {
      call: <Return>(fn: (args: Args, ctx: Context) => Return) => {
        return (event: RequestEvent, args: Args) => {
          const parsedArgs: Args = schema.parse(args)
          return fn(parsedArgs, this.getContext(event))
        }
      }
    }
  }

  call<Return>(fn: (ctx: Context & { event: RequestEvent }) => Return) {
    return (event: RequestEvent) => fn(this.getContext(event))
  }

  chain<Ctx extends {event: RequestEvent}>(mw: Middleware<Ctx>) {
    const getContext = this.getContext
    return new Middleware<Context & ReturnType<typeof mw.getContext>>((event: RequestEvent) => {
      return {
        ...getContext(event),
        ...mw.getContext(event)
      }
    });
  }
}

export const context = new Middleware((event) => ({
  event,
  cookies: event.cookies
}))