/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from 'vitest'
import { Middleware } from 'kavi/server/middleware'

describe('middleware use should work', () => {
  it("should call the middlewares in the right order", () => {
    const calls: number[] = []
    new Middleware(() => { calls.push(1); return {}})
      .use(() => {calls.push(2); return {}})
      .use(() => {calls.push(3); return {}})
      .call(() => {})({})
    expect(calls).toEqual([1, 2, 3])
  })

  it("should have the proper context", () => {
    let context: number = 0
    new Middleware(() => ({ number: 1 }))
      .call(({ number }) => {
        context = number
      })({})
    expect(context).toEqual(1)
  })

  it("should only have the last context", () => {
    let context = {}
    new Middleware(() => ({ number1: 1 }))
      .use(() => ({ number2: 2 }))
      .call((ctx) => {
        context = ctx
      })({})
    expect(context).toEqual({ number2: 2 })
  })

  it("should use the proper needs", () => {
    let needs: number = 0
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    new Middleware((needs: { number: 1 }) => ({}))
      .call(({ number }) => {
        needs = number
      })({ number: 1 })
    expect(needs).toEqual(1)
  })
})