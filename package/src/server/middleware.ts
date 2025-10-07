import type { Dict, MaybePromise } from "../types.js"
import type { z } from "zod"

export class Middleware<Ctx extends Dict> {
  constructor(public run: () => MaybePromise<Ctx>) {}

  chain = <NewCtx extends Dict>(newRun: (ctx: Ctx) => MaybePromise<NewCtx>): Middleware<NewCtx> => {
    const { run } = this
    return new Middleware(async () => newRun(await run()))
  }

  merge = <NewCtx extends Dict>(
    newRun: (ctx: Ctx) => MaybePromise<NewCtx>,
  ): Middleware<Ctx & NewCtx> => {
    const { run } = this
    return new Middleware(async () => {
      const ctx = await run()
      const newCtx = await newRun(ctx)
      return {
        ...ctx,
        ...newCtx,
      }
    })
  }

  args = <Schema extends z.Schema>(schema: Schema) => {
    type Args = z.infer<Schema>
    return {
      call: <Return>(fn: (args: Args, ctx: Ctx) => Return) => {
        return async (args: Args) => {
          const parsedArgs = schema.parse(args)
          return fn(parsedArgs as Args, await this.run())
        }
      },
    }
  }

  call = <Return>(fn: (ctx: Ctx) => Return) => {
    return async () => fn(await this.run())
  }
}

export const all = new Middleware(() => ({}))
