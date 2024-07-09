import type { RequestEvent } from "@sveltejs/kit"
import type { MaybePromise, Obj } from "../types.js"
import type * as Z from 'zod'
import { anyError, isError, type KaviError, type KaviErrorOptions } from "../errors.js"

export class Middleware<
  Context extends Obj | KaviError<E>,
  Needs extends object,
  const E extends KaviErrorOptions
> {
  constructor(private getContext: (event: Needs) => MaybePromise<Context>) {}

  use<NewContext extends Obj | KaviError<E>>(
    createContext: (context: Context) => MaybePromise<NewContext>
  ): Middleware<NewContext | (Context extends KaviError<any> ? Context : never), Needs, E> {
    const { getContext } = this
    return new Middleware(
      async (needs: Needs) => {
        const result = await getContext(needs)
        if (isError(result)) {
          return result as (Context extends KaviError<any> ? Context : never)
        }
        return createContext(result)
      }
    )
  }

  args<S extends Z.Schema>(schema: S) {
    type Args = Z.infer<S>
    return {
      call: <Return>(fn: (args: Args, context: Context & Needs) => Return) => {
        return async (args: Args, needs: Needs) => {
          const parsedArgs = schema.safeParse(args)
          if (!parsedArgs.success) {
            return anyError(parsedArgs.error) as Return
          }
          const result = await this.getContext(needs)
          if (isError(result)) {
            return result as (Context extends KaviError<any> ? Context : never)
          }
          return fn(parsedArgs.data as Args, {
            ...needs,
            ...result
          })
        }
      }
    }
  }

  call<Return>(fn: (context: Context & Needs) => Return) {
    return async (needs: Needs) => {
      const result = await this.getContext(needs)
      if (isError(result)) {
        return result as (Context extends KaviError<any> ? Context : never)
      }
      return fn({
        ...needs,
        ...result
      })
    }
  }
}

export const middleware = new Middleware((needs: { event: RequestEvent }) => needs)