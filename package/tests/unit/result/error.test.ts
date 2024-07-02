/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it, vi } from 'vitest'
import { KaviError } from 'kavi'
import { Result } from 'kavi/result'

describe('Results.error', () => {
  it("should call the function", async () => {
    const spy = vi.fn()
    await new Result(spy).error()
    expect(spy).toHaveBeenCalledOnce()
  })

  it("should call error if error", async () => {
    const spy = vi.fn()
    await new Result(vi.fn(() => new KaviError({}))).error(spy)

    expect(spy).toHaveBeenCalledOnce()
  })

  it("should not call error if ok", async () => {
    const spy = vi.fn()
    await new Result((vi.fn())).error(spy)

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should call error if thrown", async () => {
    const spy = vi.fn()
    const callback = () => {
      throw 1
    }
    await new Result(callback).error(spy)

    expect(spy).toHaveBeenCalledOnce()
  })
})