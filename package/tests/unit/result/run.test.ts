/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from "vitest"
import { AnyError, Result } from "kavi"

describe("results run", () => {
  it("should return the error", async () => {
    const [value, e] = await new Result(() => {
      throw 1
    }).run()

    expect(e).toEqual(new AnyError(1))
    expect(value).toEqual(undefined)
  })

  it("should return the value", async () => {
    const [value, e] = await new Result(() => 1).run()

    expect(e).toEqual(undefined)
    expect(value).toEqual(1)
  })
})
