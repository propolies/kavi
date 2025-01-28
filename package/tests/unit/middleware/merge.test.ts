import { describe, expect, it } from 'vitest'
import { Middleware } from 'kavi/server/middleware'

describe('middleware merge', () => {
  it("should call the middlewares in the right order", async () => {
    const calls: number[] = []
    await new Middleware(
      () => { calls.push(1); return {} })
      .merge(async () => { return new Promise<{}>((resolve) => {
        setTimeout(() => {
          calls.push(2)
          resolve({})
        }, 100)
      })})
      .merge(() => { calls.push(3); return {} })
      .call(() => {})()
    expect(calls).toEqual([1, 2, 3])
  })

  it("should have the merged context", async () => {
    let context = {}
    await new Middleware(() => ({ n1: 1 }))
      .merge(() => ({ n2: 2 }))
      .merge(() => ({ n3: 3 }))
      .call((ctx) => {
        context = ctx
      })()
    expect(context).toEqual({ n1: 1, n2: 2, n3: 3 })
  })
})