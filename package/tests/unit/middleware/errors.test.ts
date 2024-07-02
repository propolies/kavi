/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it, vi } from 'vitest'
import { KaviError } from 'kavi/errors'
import { Middleware } from 'kavi/server/middleware'
import { z } from 'zod'

const middleware = new Middleware(() => ({}))

describe('middleware errors', () => {
  it("should not call 'call' if error", async () => {
    const spy = vi.fn()
    middleware
      .use(() => new KaviError({}))
      .call(spy)({})
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should not call 'call' if error with args", async () => {
    const spy = vi.fn()
    middleware
      .use(() => new KaviError({}))
      .args(z.null())
      .call(spy)(null, {})
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should return the error", async () => {
    const res = middleware
      .use(() => new KaviError({}))
      .call(vi.fn)({})
    expect(res).toEqual(new KaviError({}))
  })

  it("should return the error with args", async () => {
    const res = middleware
      .use(() => new KaviError({}))
      .args(z.null())
      .call(vi.fn)(null, {})
    expect(res).toEqual(new KaviError({}))
  })

  it("should not call next chained middleware on error", async () => {
    const spy = vi.fn()
    middleware
      .use(() => new KaviError({}))
      .use(() => {
        spy()
        return {}
      })
      .call(vi.fn)({})
    expect(spy).toHaveBeenCalledTimes(0)
  })
})