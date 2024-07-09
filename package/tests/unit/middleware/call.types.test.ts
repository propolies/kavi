/* eslint @typescript-eslint/no-unused-vars: 0 */
import { assert, type Equals } from 'tsafe'
import { middleware } from 'kavi/server/middleware'
import { describe, it } from '../utils.types'
import type { RequestEvent } from '@sveltejs/kit'

describe("middleware.types call", () => {
  it("should have default event as needs", () => {
    const res = middleware.call(() => {})

    assert<Equals<
      typeof res,
      (needs: { event: RequestEvent }) => Promise<void>
    >>()
  })

  it("should have the default event context", () => {
    middleware.call((ctx) => {
      assert<Equals<
        typeof ctx,
        { event: RequestEvent }
      >>()

      // should complain if ctx does not exist
      assert<Equals<
        Equals<
          typeof ctx,
          { event: RequestEvent, nonExistent: unknown }
        >,
        false
      >>()
    })
  })
})