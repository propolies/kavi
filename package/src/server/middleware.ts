import type { RequestEvent } from "@sveltejs/kit"
import type { MaybePromise } from "../types.js"
import type * as Z from 'zod'

export class Middleware<
  Context extends Record<string, unknown>,
  Needs extends object
> {
  constructor(private getContext: (event: Needs) => MaybePromise<Context>) {}

  use<NewContext extends Record<string, unknown>>(
    createContext: (context: Context) => MaybePromise<NewContext>
  ): Middleware<NewContext, Needs> {
    const { getContext } = this
    return new Middleware(
      async (needs: Needs) => {
        return createContext(await getContext(needs))
      }
    )
  }

  args<S extends Z.Schema>(schema: S) {
    type Args = Z.infer<S>
    return {
      call: <Return>(fn: (args: Args, context: Context & Needs) => Return) => {
        return async (args: Args, needs: Needs) => {
          const parsedArgs = schema.parse(args)
          const result = await this.getContext(needs)
          return fn(parsedArgs as Args, {
            ...needs,
            ...result
          })
        }
      }
    }
  }

  call<Return>(fn: (context: Context & Needs) => Return) {
    return async (needs: Needs) => {
      const ctx = await this.getContext(needs)
      return fn({
        ...needs,
        ...ctx
      })
    }
  }
}

export const middleware = new Middleware((needs: { event: RequestEvent }) => needs)