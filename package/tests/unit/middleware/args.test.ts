/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from 'vitest'
import { middleware } from 'kavi/server/middleware'
import z, { ZodError } from 'zod'
import { mockNeeds } from '../utils'
import { AnyError } from 'kavi/errors'

describe('middleware args', () => {
  it("should get the args and ctx", async () => {
    const res = await middleware.use(() => ({
      num: 3
    }))
      .args(z.number())
      .call((arg, { num }) => arg + num)(2, mockNeeds)

    expect(res).toEqual(5)
  })

  it("should return ZodErrors", async () => {
    const res = await middleware.args(z.string())
      // @ts-expect-error "Should fail"
      .call((arg, ctx) => arg + ctx.number)(1, {})

    expect((res as any as AnyError)?.error).instanceOf(ZodError)
  })
})