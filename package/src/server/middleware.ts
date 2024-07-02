import type { RequestEvent } from "@sveltejs/kit"
import type { Obj } from "../types.js"
import type * as Z from 'zod'
import { isError, type KaviError, type KaviErrorOptions } from "../errors.js"

export class Middleware<
  Context extends Obj | KaviError<E>,
  Needs extends object,
  const E extends KaviErrorOptions
> {
  constructor(private getContext: (event: Needs) => Context) {}

  use<NewContext extends Obj | KaviError<E>>(
    createContext: (context: Context) => NewContext
  ): Middleware<NewContext | (Context extends KaviError<any> ? Context : never), Needs, E> {
    const { getContext } = this
    return new Middleware(
      (needs: Needs) => {
        const result = getContext(needs)
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
        return (args: Args, needs: Needs) => {
          const parsedArgs: Args = schema.parse(args)
          const result = this.getContext(needs)
          if (isError(result)) {
            return result as (Context extends KaviError<any> ? Context : never)
          }
          return fn(parsedArgs, {
            ...needs,
            ...result
          })
        }
      }
    }
  }

  call<Return>(fn: (context: Context & Needs) => Return) {
    return (needs: Needs) => {
      const result = this.getContext(needs)
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