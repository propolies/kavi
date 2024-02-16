import { context } from "svelte-api"
import z from 'zod'

const user = context.use(() => {
  if (Math.random() > .5) throw new Error("some error")
  return {
    n: 3
  }
})

export const router = {
  one: user
    .call(({ n }) => {
      console.log(1)
      return 1 + n
    }),
  add: context
    .args(z.tuple([z.number(), z.number()]))
    .call(([a, b]) => {
    console.log(a + b)
    return a + b
    }),
  cookies: {
    set: context
      .call(({ event }) => {
        event.cookies.set(
          JSON.stringify(Math.random()),
          JSON.stringify(Math.random()),
          { path: "/" }
        )
      }),
    get: context
      .call(({ event }) => {
        return event.cookies.getAll()
      }),
    delete: context
      .call(({ event }) => {
        event.cookies.getAll().forEach(({ name }) => {
          console.log("deleting", name)
          event.cookies.delete(name, {
            path: "/"
          })
        })
      })
  }
}
export type Router = typeof router