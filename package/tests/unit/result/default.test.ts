/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from "vitest"
import { Result } from "kavi"

describe("results default", () => {
  it("should return value", async () => {
    const res = await new Result(() => 3).default(2)
    expect(res).toEqual(3)
  })

  it("should return default value on error", async () => {
    const res = await new Result(() => {
      throw new Error()
    }).default(2)
    expect(res).toEqual(2)
  })
})
