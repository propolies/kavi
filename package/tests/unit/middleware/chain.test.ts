import { describe, expect, it } from 'vitest'
import { Middleware } from 'kavi/server/middleware'

describe('middleware use', () => {
  it("should call the middlewares in the right order", async () => {
    const calls: number[] = []
    await new Middleware(
      () => { calls.push(1); return {} })
      .chain(async () => { return new Promise<{}>((resolve) => {
        setTimeout(() => {
          calls.push(2)
          resolve({})
        }, 100)
      })})
      .chain(() => { calls.push(3); return {} })
      .call(() => {})()
    expect(calls).toEqual([1, 2, 3])
  })

  it("should have the proper context", async () => {
    let context: number = 0
    await new Middleware(() => ({ number: 1 }))
      .call(({ number }) => {
        context = number
      })()
    expect(context).toEqual(1)
  })

  it("should only have the last context", async () => {
    let context = {}
    await new Middleware(() => ({ n1: 1 }))
      .chain(() => ({ n2: 2 }))
      .chain(() => ({ n3: 3 }))
      .call((ctx) => {
        context = ctx
      })()
    expect(context).toEqual({ n3: 3 })
  })
})