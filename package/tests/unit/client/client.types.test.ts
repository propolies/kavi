/* eslint @typescript-eslint/no-unused-vars: 0 */
import { createApiClient, type LoadEvent } from 'kavi/client/client'
import { describe, it } from '../utils.types'
import { middleware } from 'kavi/server/middleware'
import { createOptions } from 'kavi'
import { assert, type Equals } from 'tsafe'
import type { Result } from 'kavi'
import { z } from 'zod'

const options = createOptions({})

describe("client", () => {
  it("should have the routes typed", () => {
    const router = {
      one: middleware
        .call(() => 1),
      two: middleware
        .call(() => 2)
    }

    const client = createApiClient<typeof router>(options)

    assert<Equals<
      keyof typeof client,
      "with" | "one" | "two"
    >>()
  })

  it("should have proper results", () => {
    const router = {
      one: middleware
        .call(() => 1),
      hello: middleware
        .call(() => "hello"),
      async: middleware
        .call(async () => 1),
    }

    const client = createApiClient<typeof router>(options)

    assert<Equals<
      ReturnType<typeof client.one>,
      Result<number>
    >>()

    assert<Equals<
      ReturnType<typeof client.hello>,
      Result<string>
    >>()

    assert<Equals<
      ReturnType<typeof client.async>,
      Result<number>
    >>()
  })

  it("should work with args", () => {
    const router = {
      add: middleware
        .args(z.tuple([z.number(), z.number()]))
        .call(([a, b]) => a + b)
    }

    const client = createApiClient<typeof router>(options)

    assert<Equals<
      Parameters<typeof client.add>,
      [arg: [number, number]]
    >>()

    type Returns = ReturnType<typeof client.add>
    assert<Equals<
      Returns,
      Result<number>
    >>()
  })

  it("should accept LoadEvent", () => {
    const router = {
      one: middleware
        .call(() => 1)
    }

    const client = createApiClient<typeof router>(options)

    assert<Equals<
      Parameters<typeof client.with>,
      [arg: LoadEvent]
    >>()

    assert<Equals<
      keyof ReturnType<typeof client.with>,
      "one"
    >>()
  })
})