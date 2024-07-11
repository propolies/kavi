/* eslint @typescript-eslint/no-unused-vars: 0 */
import { assert, Equals } from 'tsafe'
import { middleware } from 'kavi/server/middleware'
import { describe, it } from '../utils.types'
import z from 'zod'
import { RequestEvent } from '@sveltejs/kit'

describe("middleware.test args", () => {
  it("should get args types", () => {
    const call = middleware
      .args(z.string()).call((args, ctx) => {
        assert<Equals<
          typeof args,
          string
        >>()

        assert<Equals<
          typeof ctx,
          { event: RequestEvent }
        >>()

        return 1
      })

    assert<Equals<
      typeof call,
      (args: string, needs: { event: RequestEvent }) => Promise<number>
    >>()
  })
})