import type { RequestEvent } from "@sveltejs/kit"
import type { Primitive, Schema } from 'zod'

type SchemaReturn<T extends Schema> = T extends { parse: (...args: any[]) => infer R }
  ? R
  : number

type CtxIn = {
  path: string
}

type Exact<A, B> = (<T>() => T extends A ? 1 : 0) extends (<T>() => T extends B ? 1 : 0)
    ? (A extends B ? (B extends A ? unknown : never) : never)
    : never

type CleanParams<T extends (arg: never) => unknown> = T extends (arg: infer Arg) => infer R
  ? Exact<Arg, unknown> extends 0
    ? T
    : () => R
  : never

const createMiddleware = <Needs>() => class Middleware<Context> {
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

  call<Return>(fn: (ctx: Context & CtxIn ) => Return) {
    // Build step
    return (ctxIn: CtxIn): CleanParams<(needs: Needs) => Return> => {
      // Need step
      return (...needs: Needs[]) => {
        console.log("running")
        const getContext = this.getContext
        // Return step
        return fn({
          ...getContext(needs[0]),
          ...ctxIn,
        })
      } 
    }
  }
}

const context = new (createMiddleware<number>())((num: number) => ({ num }))
const noContext = new (createMiddleware())(() => {})

const c = context.use(({ num }) => {
  return {
    str: "heya"
  }
}).call(({ num, str }) => {
  console.log(`[use-call]: num:${num} str:${str}`)
})
({ path: "r.path" })


const x = context.call((ctx) => {
  console.log("[call]: ctx:", ctx)
  const { path, num } = ctx
  console.log(`[call]: num:${num} path:${path}`)
})
({ path: "r.path" })
(123)

// context.call((ctx) => {
//   console.log("[call]: ctx:", ctx)
//   const { path, num } = ctx
//   console.log(`[call]: num:${num} path:${path}`)
// })
// ({ path: "r.path" })
// ()

const cc = noContext.call((ctx) => {
  console.log("[call]: ctx:", ctx)
})
({ path: "r.path" })