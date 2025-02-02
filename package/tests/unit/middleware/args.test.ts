import { describe, expect, it } from "vitest"
import { all } from "kavi/server/middleware"
import z, { ZodError } from "zod"

describe("middleware args", () => {
  it("should get the parameters and context", async () => {
    const res = await all
      .chain(() => ({
        num: 3,
      }))
      .args(z.number())
      .call((arg, { num }) => arg + num)(2)

    expect(res).toEqual(5)
  })

  it("should return ZodErrors", async () => {
    let res
    try {
      await all
        .args(z.string())
        // @ts-expect-error "Should fail"
        .call((arg, ctx) => arg + ctx.number)(1, {})
    } catch (e) {
      res = e
    }

    expect(res).instanceOf(ZodError)
  })
})
