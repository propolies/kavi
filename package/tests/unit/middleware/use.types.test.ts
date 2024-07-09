/* eslint @typescript-eslint/no-unused-vars: 0 */
import { assert, type Equals } from 'tsafe'
import { middleware } from 'kavi/server/middleware'
import { describe, it } from '../utils.types'
import type { RequestEvent } from '@sveltejs/kit'

describe("middleware.types use", () => {
  it("should overwrite old context", () => {
    middleware
      .use(() => ({ old: "old" }))
      .use(() => ({ new: 1 }))
      .call((ctx) => {
        assert<Equals<
          typeof ctx,
          { new: number, event: RequestEvent }
        >>()
      })
  })

  it("should work with async", () => {
    middleware
      .use(async () => ({ new: 1 }))
      .call((ctx) => {
        assert<Equals<
          typeof ctx,
          { new: number, event: RequestEvent }
        >>()
      })
  })
})
