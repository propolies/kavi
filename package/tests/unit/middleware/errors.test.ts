/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it, vi } from 'vitest'
import { KaviError } from 'kavi/errors'
import { middleware } from 'kavi/server/middleware'
import { z } from 'zod'
import { mockNeeds } from '../utils'

describe('middleware errors', () => {
  it("should not call 'call' if error", async () => {
    const spy = vi.fn()
    await middleware
      .use(() => new KaviError({}))
      .call(spy)(mockNeeds)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should not call 'call' if error with args", async () => {
    const spy = vi.fn()
    await middleware
      .use(() => new KaviError({}))
      .args(z.null())
      .call(spy)(null, mockNeeds)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should return the error", async () => {
    const res = await middleware
      .use(() => new KaviError({}))
      .call(vi.fn)(mockNeeds)
    expect(res).toEqual(new KaviError({}))
  })

  it("should return the error with args", async () => {
    const res = await middleware
      .use(() => new KaviError({}))
      .args(z.null())
      .call(vi.fn)(null, mockNeeds)
    expect(res).toEqual(new KaviError({}))
  })

  it("should not call next chained middleware on error", async () => {
    const spy = vi.fn()
    await middleware
      .use(() => new KaviError({}))
      .use(() => {
        spy()
        return {}
      })
      .call(vi.fn)(mockNeeds)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should not call 'call' ZodError", async () => {
    const spy = vi.fn()
    await middleware
      .args(z.string())
      // @ts-expect-error "Should fail"
      .call(spy)(1, mockNeeds)
    expect(spy).toHaveBeenCalledTimes(0)
  })
})