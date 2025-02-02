/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it, vi } from "vitest"
import { Result } from "kavi"

describe("results ok", () => {
  it("should call the callback if ok", async () => {
    const spy = vi.fn()
    await new Result(vi.fn()).ok(spy)

    expect(spy).toHaveBeenCalledOnce()
  })

  it("should not call ok if thrown", async () => {
    const spy = vi.fn()
    await new Result(() => {
      throw 1
    }).ok(spy)

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it("should give lambda the result", async () => {
    let value: any = null
    await new Result(() => 1).ok((v) => (value = v))

    expect(value).toEqual(1)
  })
})
