import { Vector } from "$lib/vector"
import { middleware } from "kavi/server"
import z from 'zod'

const mw = middleware.use(() => {
  if (Math.random() > .5) {
    throw "nope"
  }
  return {
    a: 1
  }
})

export const apiRouter = {
  ping: middleware
    .call(() => {
      console.log("[server] got ping")
      return "pong"
    }),
  add: middleware
    .args(z.tuple([z.number(), z.number()]))
    .call(([a, b]) => {
      return a + b
    }),
  cookie: {
    add: middleware
      .call(({ event }) => {
        event.cookies.set("theCookie", "123", {
          path: "/"
        })
      }),
    delete: middleware
      .call(({ event }) => {
        event.cookies.delete("theCookie", {
          path: "/"
        })
      })
  },
  crash: mw
    .call(() => {
      return "returned"
    }),
  custom: middleware
    .call(() => {
      return new Vector(1, 3)
    }),
  test: middleware
    .args(z.string())
    .call(() => {
      console.log("hej")
      return 1
    }),
  async: middleware
    .call(async () => {
      return 1
    })
}
export type Api = typeof apiRouter
