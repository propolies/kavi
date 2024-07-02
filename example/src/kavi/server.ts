import { Vector } from "$lib/vector"
import { error } from "kavi"
import { createWss, middleware, type WssRouterOptions } from "kavi/server"
import z from 'zod'

// Ws
const wsRouter = {
  msg: {
    schema: z.string()
  }
} satisfies WssRouterOptions
export type Wss = typeof wsRouter
export const wss = createWss() // wsRouter

// Api
const mw = middleware.use(() => {
  if (Math.random() > .5) {
    return error({
      code: 404
    })
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
      console.log("HERE?")
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
    .call(() => console.log("hej"))
}
export type Api = typeof apiRouter
