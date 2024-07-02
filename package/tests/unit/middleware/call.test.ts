/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from 'vitest'
import { Middleware } from 'kavi/server/middleware'

describe('middleware call should work', () => {
  it("call should return", () => {
    const res = new Middleware(() => ({}))
      .call(() => 1)({})
    expect(res).toEqual(1)
  })
})