/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it, vi } from 'vitest'
import { error } from 'kavi'
import { Result } from 'kavi/result'

describe('results.ok', () => {
  it("should call the function", async () => {
    const spy = vi.fn()
    await new Result(spy).ok()

    expect(spy).toHaveBeenCalledOnce()
  })

  it("should call the callback if ok", async () => {
    const spy = vi.fn()
    await new Result(vi.fn()).ok(spy)

    expect(spy).toHaveBeenCalledOnce()
  })

  it("should not call ok if error", async () => {
    const spy = vi.fn()
    await new Result(vi.fn(() => error({}))).ok(spy)

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should not call ok if thrown", async () => {
    const spy = vi.fn()
    const callback = () => {
      throw error({})
    }
    await new Result(callback).ok(spy)

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should give error as callback arg", async () => {
    let err: any = null
    await new Result(() => error({})).error((e) => err = e)

    expect(err).toEqual(error({}))
  })

  it("should give value as callback arg", async () => {
    let value: any = null
    await new Result(() => 1).ok((v) => value = v)

    expect(value).toEqual(1)
  })
})