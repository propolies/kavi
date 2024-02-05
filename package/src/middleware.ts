import type { RequestEvent } from "@sveltejs/kit"
import type { Schema } from 'zod'

type SchemaReturn<T extends Schema> = T extends { parse: (...args: any[]) => infer R }
  ? R
  : number

class Middleware<Context, Needs> {
  constructor(private getContext: (needs: Needs) => Context) {}
  
  use<NewContext>(createContext: (ctx: Context) => NewContext) {
    const getContext = this.getContext
    return new Middleware((ctx: Needs) => {
      const context = getContext(ctx)
      return {
        ...context,
        ...createContext(context)
      }
    });
  }
  
  args<S extends Schema>(schema: S) {
    type Args = SchemaReturn<S>
    return {
      call: <Return>(fn: (args: Args, ctx: Context ) => Return) => {
        return (args: Args, ...needs: (Needs)[]) => {
          const parsedArgs: Args = schema.parse(args)
          const getContext = this.getContext
          return fn(parsedArgs, {
            ...getContext(needs[0])
          })
        } 
      }
    }
  }
  
  call<Return>(fn: (ctx: Context ) => Return) {
    return (...needs: Needs[]) => {
      const getContext = this.getContext
      return fn({
        ...getContext(needs[0])
      })
    } 
  }
}

export const context = new Middleware((event: RequestEvent) => ({
  event,
  cookies: event.cookies
}))
export const noContext = new Middleware(() => ({}))