/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from 'vitest'
import { middleware } from 'kavi/server/middleware'
import z, { ZodError } from 'zod'
import { createApiClient, LoadEvent } from 'kavi/client/client'
import { createOptions } from 'kavi/options'
import { mockNeeds } from '../utils'

const options = createOptions()

describe('client.middleware', () => {
  it("should throw a ZodError", async () => {
    const router = {
      test: middleware
        .args(z.string())
        .call(() => 1)
    }

    const mockEvent = {
      fetch: ($: string, $$: any) => ({
        then: ($: any) => {
          // @ts-expect-error "Should fail"
          return router.test(1, mockNeeds)
        }
      })
    }

    const client = createApiClient<typeof router>(options)
    const [res, err] = await client.with(mockEvent as any as LoadEvent).test("").run()
    expect(res).toEqual(undefined)
    expect(err?.error).toBeInstanceOf(ZodError)
  })
})