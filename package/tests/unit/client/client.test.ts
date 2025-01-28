/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from 'vitest'
import { all } from 'kavi/server/middleware'
import z, { ZodError } from 'zod'
import { createApiClient } from 'kavi/client/client'
import { createOptions } from 'kavi/options'
import { AsyncLocalStorage } from 'node:async_hooks'

const options = createOptions()

describe('client.middleware', () => {
  it("should throw a ZodError on wrong argument", async () => {
    const router = {
      test: all
        .args(z.string())
        .call(() => 1)
    }

    const mockEvent = {
      fetch: ($: string, $$: any) => ({
        then: ($: any) => {
          // @ts-expect-error Should fail
          return router.test(1)
        }
      })
    }

    globalThis.ctx = { event: mockEvent as any }

    const [res, err] = await (new AsyncLocalStorage).run({ event: mockEvent }, async () => {
      const client = createApiClient<typeof router>(options)
      return client.test("").run()
    })

    expect(res).toEqual(undefined)
    expect(err?.error).toBeInstanceOf(ZodError)
  })
})