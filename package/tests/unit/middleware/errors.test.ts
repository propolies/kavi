/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it, vi } from 'vitest'
import { middleware } from 'kavi/server/middleware'
import { z } from 'zod'
import { mockNeeds } from '../utils'

describe('middleware errors', () => {
  it("should not call 'call' if error", async () => {
    const spy = vi.fn()
    try {
      await middleware
        .use(() => {
          throw 1
        })
        .call(spy)(mockNeeds)
    } catch(e) {
      //
    }
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should not call 'call' if error with args", async () => {
    const spy = vi.fn()
    try {
      await middleware
        .use(() => {
          throw 1
        })
        .args(z.null())
        .call(spy)(null, mockNeeds)
    } catch(e) {
      //
    }
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should return the error", async () => {
    let res
    try {
      await middleware
        .use(() => {
          throw 1
        })
        .call(vi.fn)(mockNeeds)
    } catch(e) {
      res = e
    }
    expect(res).toEqual(1)
  })

  it("should return the error with args", async () => {
    let res
    try {
      await middleware
        .use(() => {
          throw 1
        })
        .args(z.null())
        .call(vi.fn)(null, mockNeeds)
    } catch(e) {
      res = e
    }
    expect(res).toEqual(1)
  })

  it("should not call next chained middleware on error", async () => {
    const spy = vi.fn()
    try {
      await middleware
        .use(() => {
          throw 1
        })
        .use(() => {
          spy()
          return {}
        })
        .call(vi.fn)(mockNeeds)
    } catch(e) {
      //
    }
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should not call 'call' on ZodError", async () => {
    const spy = vi.fn()
    try {
      await middleware
        .args(z.string())
      // @ts-expect-error "Should fail"
        .call(spy)(1, mockNeeds)
    } catch (e) {
      //
    }
    expect(spy).toHaveBeenCalledTimes(0)
  })
})