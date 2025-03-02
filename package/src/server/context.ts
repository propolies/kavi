import { RequestEvent } from "@sveltejs/kit"
import { AsyncLocalStorage } from "node:async_hooks"

export const asyncLocalStorage = new AsyncLocalStorage()

export const ctx = {
  /**
   * The `request event` from svelte. Use securely through `ctx.event`.
   */
  get event(): RequestEvent {
    const store = asyncLocalStorage?.getStore()
    if (!store) {
      throw new Error("Event accessed outside of context or on the browser")
    }
    // @ts-expect-error Can't be typed
    return store.event
  },
}
