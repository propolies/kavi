import { all, ctx } from "kavi/server"

export const router = {
  hello: all.call(() => {
    console.log("setting cookie")
    ctx.event.cookies.set("cook", "123", {
      path: "/",
    })
  }),
}
export type Router = typeof router
