/* eslint @typescript-eslint/no-unused-vars: 0 */
import { createApiClient } from 'kavi/client/client'
import { describe, it } from '../utils.types'
import { all } from 'kavi/server/middleware'
import { createOptions } from 'kavi'
import { assert, type Equals } from 'tsafe'
import type { Result } from 'kavi'
import { z } from 'zod'

const options = createOptions()

describe("client", () => {
  it("should have the routes typed", () => {
    const router = {
      one: all
        .call(() => 1),
      two: all
        .call(() => 2)
    }

    const client = createApiClient<typeof router>(options)

    assert<Equals<
      keyof typeof client,
      "one" | "two"
    >>()
  })

  it("should have proper results", () => {
    const router = {
      one: all
        .call(() => 1),
      hello: all
        .call(() => "hello"),
      async: all
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
      add: all
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
})