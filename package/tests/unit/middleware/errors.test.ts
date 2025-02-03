/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it, vi } from "vitest"
import { all } from "kavi/server/middleware"
import { z } from "zod"

describe("middleware errors", () => {
  it("should not call 'call' if error", async () => {
    const spy = vi.fn()
    try {
      await all
        .chain(() => {
          throw 1
        })
        .call(spy)()
    } catch {
      //
    }
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should not call 'call' if error with args", async () => {
    const spy = vi.fn()
    try {
      await all
        .chain(() => {
          throw 1
        })
        .args(z.null())
        .call(spy)(null)
    } catch {
      //
    }
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should return the error", async () => {
    let res
    try {
      await all
        .chain(() => {
          throw 1
        })
        .call(vi.fn)()
    } catch (e) {
      res = e
    }
    expect(res).toEqual(1)
  })

  it("should return the error with args", async () => {
    let res
    try {
      await all
        .chain(() => {
          throw 1
        })
        .args(z.null())
        .call(vi.fn)(null)
    } catch (e) {
      res = e
    }
    expect(res).toEqual(1)
  })

  it("should not call next chained middleware on error", async () => {
    const spy = vi.fn()
    try {
      await all
        .chain(() => {
          throw 1
        })
        .chain(() => {
          spy()
          return {}
        })
        .call(vi.fn)()
    } catch {
      //
    }
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should not call 'call' on ZodError", async () => {
    const spy = vi.fn()
    try {
      await all
        .args(z.string())
        // @ts-expect-error "Should fail"
        .call(spy)(1)
    } catch {
      //
    }
    expect(spy).toHaveBeenCalledTimes(0)
  })
})
