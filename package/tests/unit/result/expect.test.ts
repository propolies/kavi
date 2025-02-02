/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from "vitest"
import { Result } from "kavi"

describe("results expect", () => {
  it("should throw on any error", async () => {
    let error
    try {
      await new Result(() => {
        throw 1
      }).expect()
    } catch (e) {
      error = e
    }
    expect(error).toEqual(1)
  })

  it("should throw the custom error", async () => {
    let error
    try {
      await new Result(() => {
        throw 1
      }).expect((e) => (e as number) + 2)
    } catch (e) {
      error = e
    }
    expect(error).toEqual(3)
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
