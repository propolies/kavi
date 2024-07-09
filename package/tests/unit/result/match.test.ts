/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it, vi } from 'vitest'
import { KaviError } from 'kavi'
import { Result } from 'kavi/client/result'

describe('results match', () => {
  it("should call error if error", async () => {
    const errorSpy = vi.fn()
    const okSpy = vi.fn()
    await new Result(() => new KaviError({})).match({
      error: errorSpy,
      ok: okSpy
    })

    expect(errorSpy).toHaveBeenCalledOnce()
    expect(okSpy).toHaveBeenCalledTimes(0)
  })

  it("should call ok if ok", async () => {
    const errorSpy = vi.fn()
    const okSpy = vi.fn()
    await new Result(() => 1).match({
      error: errorSpy,
      ok: okSpy
    })

    expect(errorSpy).toHaveBeenCalledTimes(0)
    expect(okSpy).toHaveBeenCalledOnce()
  })
})