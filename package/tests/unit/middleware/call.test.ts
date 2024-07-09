/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it, vi } from 'vitest'
import { middleware, Middleware } from 'kavi/server/middleware'
import { mockNeeds } from '../utils'

describe('middleware call', () => {
  it("should return", async () => {
    const res = await middleware.call(() => 1)(mockNeeds)
    expect(res).toEqual(1)
  })

  it("should work with async", async () => {
    const res = await middleware.call(async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 100)
      })
    })(mockNeeds)
    expect(res).toEqual(1)
  })

  it("should call middleware", async () => {
    const spy = vi.fn()
    await new Middleware(() => {
      spy()
      return {}
    }).call(() => 1)(mockNeeds)
    expect(spy).toHaveBeenCalledOnce()
  })
})