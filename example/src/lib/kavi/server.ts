import { all, ctx } from "kavi/server"
import z from "zod"

export const router = {
  add: all
    .args(z.tuple([z.number(), z.number()]))
    .call(([a, b]) => {
      return a + b
    }),
}
export type Router = typeof router
