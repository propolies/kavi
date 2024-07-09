/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from 'vitest'
import { Middleware } from 'kavi/server/middleware'

describe('middleware needs', () => {
  it("should add needs to ctx", async () => {
    const res = await new Middleware(($needs: { n: number }) => ({ ctx: "ctx" }))
      .call((ctx) => ctx)({ n: 1 })
    expect(res).toEqual({ n: 1, ctx: "ctx" })
  })
})