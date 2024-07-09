/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it, vi } from 'vitest'
import { AnyError, error, KaviError } from 'kavi'
import { Result } from 'kavi/client/result'

describe('results error', () => {
  it("should return error by default", async () => {
    const err = await new Result(vi.fn(() => new KaviError({}))).error()
    expect(err).toBeInstanceOf(KaviError)
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
    await new Result(() => {
      throw 1
    }).error(spy)

    expect(spy).toHaveBeenCalledOnce()
  })

  it("should give lambda the result", async () => {
    let err: any = null
    await new Result(() => error({})).error((e) => err = e)

    expect(err).toEqual(error({}))
  })
})