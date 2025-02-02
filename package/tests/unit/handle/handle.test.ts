/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it, vi } from "vitest"
import { createHandle, all } from "kavi/server"
import { AnyError, createOptions } from "kavi/index.js"
import { z, ZodError } from "zod"

function createRequest(url: URL, data?: unknown) {
  return new Request(url, {
    method: "POST",
    body: options.devalue.stringify(data),
  })
}

const options = createOptions()

describe("handle", () => {
  it("should resolve if no api is found", async () => {
    const resolveSpy = vi.fn()
    const handle = createHandle({}, options)
    await handle({
      event: {
        url: new URL("http:/localhost:4573/"),
      } as any,
      resolve: resolveSpy,
    })

    expect(resolveSpy).toHaveBeenCalledOnce()
  })

  it("should call the api", async () => {
    const url = new URL("http:/localhost:4573/kavi?api=route")
    const routeSpy = vi.fn()
    const handle = createHandle({ route: routeSpy }, options)
    await handle({
      event: {
        url,
        request: createRequest(url),
        cookies: {},
      },
    } as any)

    expect(routeSpy).toHaveBeenCalledOnce()
  })

  it("should call the nested api", async () => {
    const url = new URL("http:/localhost:4573/kavi?api=lvl1.lvl2.lvl3")
    const routeSpy = vi.fn()
    const handle = createHandle(
      {
        lvl1: {
          lvl2: {
            lvl3: routeSpy,
          },
        },
      },
      options,
    )
    await handle({
      event: {
        url,
        request: createRequest(url),
        cookies: {},
      },
    } as any)

    expect(routeSpy).toHaveBeenCalledOnce()
  })

  it("should throw ZodError", async () => {
    const url = new URL("http:/localhost:4573/kavi?api=zod")
    const handle = createHandle(
      {
        zod: all.args(z.number()).call(() => {}),
      },
      options,
    )

    const res = await handle({
      event: {
        url,
        request: createRequest(url, "wrong"),
        cookies: {},
      } as any,
      resolve: vi.fn(),
    })

    const body = options.devalue.parse(await res.text())
    expect((body as unknown as AnyError)?.error).toBeInstanceOf(ZodError)
  })

  it("should work with args", async () => {
    const url = new URL("http:/localhost:4573/kavi?api=zod")
    const handle = createHandle(
      {
        zod: all.args(z.number()).call((args) => args),
      },
      options,
    )

    const res = await handle({
      event: {
        url,
        request: createRequest(url, 1),
        cookies: {},
      } as any,
      resolve: vi.fn(),
    })

    const body = options.devalue.parse(await res.text())
    expect(body).toEqual(1)
  })
})
