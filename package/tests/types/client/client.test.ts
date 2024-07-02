/* eslint @typescript-eslint/no-unused-vars: 0 */
import { createApiClient, type LoadEvent } from 'kavi/client/client'
import { it } from '../it'
import { middleware } from 'kavi/server/middleware'
import { z } from 'zod'
import { AnyError, KaviError, error } from 'kavi'
import { Equals, assert } from 'tsafe'

const fn = () => {}

it("should work", () => {
  const router = {
    one: middleware
      .call(fn),
    add: middleware
      .args(z.tuple([z.number(), z.number()]))
      .call(fn)
  }

  const client = createApiClient<typeof router>()
  client.one()
  client.add([1, 2])
  client.with(1 as any as LoadEvent).one()
})

it("should have correct error types", async () => {
  const router = {
    danger: middleware
      .call(() => {
        if (Math.random() > .5) {
          return error({ code: 404 })
        }
        return 1
      })
  }

  const client = createApiClient<typeof router>()
  const res = client.danger()
  it("should work with ok", async () => {
    const ok = await res.ok()
    type Ok = typeof ok
    assert<Equals<
      Ok,
      1 | undefined
    >>()
  })

  it("should work with ok", async () => {
    const ok = await res.ok()
    type Ok = typeof ok
    assert<Equals<
      Ok,
      1 | undefined
    >>()
  })

  it("should work with error", async () => {
    const err = await res.error()
    type Err = typeof err
    assert<Equals<
      Err,
      AnyError | KaviError<{ readonly code: 404 }> | undefined
    >>()
  })
})
