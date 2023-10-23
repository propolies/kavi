import { context } from "./middleware"

export const router = {
  add: context
    .call(() => {
      return 1
    })
}
export type Router = typeof router
export const routerKeys = Object.keys(router)