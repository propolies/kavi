/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it, vi } from 'vitest'
import { Result } from 'kavi/result'
import { KaviError } from 'kavi/errors'
import { error } from 'console'

describe('Results.expect', () => {
  it("should throw the kavi error", async () => {
    const spy = vi.fn()
    try {
      await new Result(() => {
        throw error({})
      }).expect()
    } catch (e) {
      spy()
    }
    expect(spy).toHaveBeenCalledOnce()
  })

  it("should throw on any error", async () => {
    const spy = vi.fn()
    try {
      await new Result(() => {
        throw 1
      }).expect()
    } catch (e) {
      spy()
    }
    expect(spy).toHaveBeenCalledOnce()
  })

  it("should return value if no error", async () => {
    let res
    try {
      res = await new Result(() => 1).expect()
    } catch (e) {
      //
    }
    expect(res).toEqual(1)
  })
})