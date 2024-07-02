/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from 'vitest'
import { Middleware } from 'kavi/server/middleware'
import z, { ZodError } from 'zod'

describe('middleware args should work', () => {
  it("should get the args", () => {
    const res = new Middleware(() => ({}))
      .args(z.string())
      .call((arg) => arg + 1)("hey", {})
    expect(res).toEqual("hey1")
  })

  it("should also get the context", () => {
    const res = new Middleware(() => ({ number: 123 }))
      .args(z.string())
      .call((arg, ctx) => arg + ctx.number)("hey", {})
    expect(res).toEqual("hey123")
  })

  it("should fail if validation schema is wrong", () => {
    let res: any = {}
    try {
      res = new Middleware(() => ({ number: 123 }))
        .args(z.string())
        // @ts-expect-error "Should fail"
        .call((arg, ctx) => arg + ctx.number)(123, {})
    } catch (e) {
      res = e
    }

    expect(res).instanceOf(ZodError)
  })
})