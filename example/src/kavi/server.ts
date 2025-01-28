import { Vector } from "$lib/vector"
import { all } from "kavi/server"
import { ctx } from "kavi/server"
import z from 'zod'
import { UserSchema } from "./schemas"

const mw = all.chain(() => {
  if (Math.random() > .5) {
    throw "nope"
  }
  return {
    a: 1
  }
})

export const apiRouter = {
  ping: all
    .call(() => {
      console.log("[server] got ping")
      return "pong"
    }),
  add: all
    .args(z.tuple([z.number(), z.number()]))
    .call(([a, b]) => {
      return a + b
    }),
  cookie: {
    add: all
      .call(() => {
        ctx.event.cookies.set("theCookie", Math.random().toString().slice(2, 6), {
          path: "/"
        })
      }),
    delete: all
      .call(() => {
        ctx.event.cookies.delete("theCookie", {
          path: "/"
        })
      })
  },
  crash: mw
    .call(() => {
      return "returned"
    }),
  custom: all
    .call(() => {
      return new Vector(1, 3)
    }),
  test: all
    .args(z.string())
    .call(() => {
      return 1
    }),
  async: all
    .call(async () => {
      return 1
    }),
  formTest: all
    .args(UserSchema)
    .call(async (data) => {
      console.log("data: ", data)
    })
}
export type Api = typeof apiRouter
