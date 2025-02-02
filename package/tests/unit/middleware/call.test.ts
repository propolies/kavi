import { describe, expect, it, vi } from "vitest"
import { all, Middleware } from "kavi/server/middleware"

describe("middleware call", () => {
  it("should return", async () => {
    const res = await all.call(() => 1)()
    expect(res).toEqual(1)
  })

  it("should work with async", async () => {
    const res = await all.call(async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 100)
      })
    })()
    expect(res).toEqual(1)
  })

  it("should call middleware", async () => {
    const spy = vi.fn()
    await new Middleware(() => {
      spy()
      return {}
    }).call(() => 1)()
    expect(spy).toHaveBeenCalledOnce()
  })
})
