/* eslint @typescript-eslint/no-unused-vars: 0 */
import { assert, Equals } from 'tsafe'
import { middleware } from 'kavi/server/middleware'
import { it } from '../it'
import z from 'zod'
import { RequestEvent } from '@sveltejs/kit'

it("should have event as context", () => {
  middleware.call((ctx) => {
    assert<Equals<
      typeof ctx,
      {
        event: RequestEvent
      }
    >>()
  })
})

it("should have event as context with args", () => {
  middleware
    .args(z.string())
    .call((_, ctx) => {
      assert<Equals<
      typeof ctx,
      {
        event: RequestEvent
      }
    >>()
    })
})
