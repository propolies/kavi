/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it, vi } from 'vitest'
import { createHandle } from 'kavi/server'
import { createRequest } from './utils.js'

describe("Handle should work", () => {
  it("Should resolve if no api is called", async () => {
    const url = new URL("http:/localhost:4573/")
    const resolveSpy = vi.fn()
    const handle = createHandle({})
    await handle({
      event: { url } as any,
      resolve: resolveSpy
    })

    expect(resolveSpy).toHaveBeenCalledOnce()
  })

  it("Should call the api", async () => {
    const url = new URL("http:/localhost:4573/kavi?api=route")
    const spyRoute = vi.fn()
    const handle = createHandle({ route: spyRoute })
    await handle({
      event: {
        url,
        request: createRequest(url, [undefined]),
        cookies: {}
      } as any,
      resolve: vi.fn()
    })

    expect(spyRoute).toHaveBeenCalledOnce()
  })

  it("Should call the nested api", async () => {
    const url = new URL("http:/localhost:4573/kavi?api=lvl1.lvl2.lvl3")
    const spyRoute = vi.fn()
    const handle = createHandle({
      lvl1: {
        lvl2: {
          lvl3: spyRoute
        }
      }
    })
    await handle({
      event: {
        url,
        request: createRequest(url, [undefined]),
        cookies: {}
      } as any,
      resolve: vi.fn()
    })

    expect(spyRoute).toHaveBeenCalledOnce()
  })
})