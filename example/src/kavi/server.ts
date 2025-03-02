import { all, ctx } from "kavi/server"
import z from "zod"

export const router = {
  divide: all
    .args(z.tuple([z.number(), z.number()]))
    .call(([a, b]) => {
      if (b == 0) throw new Error("Division by zero")
      return a / b
    }),
  setCookie: all.call(() => {
    ctx.event.cookies.set("cookie", "123", {
      path: "/",
    })
  }),
  getCookie: all.call(() => {
    return ctx.event.cookies.get("cookie")
  }),
  deleteCookie: all.call(() => {
    ctx.event.cookies.delete("cookie", {
      path: "/",
    })
  }),
}
export type Router = typeof router
