/* eslint @typescript-eslint/no-unused-vars: 0 */
import { assert, Equals } from 'tsafe'
import { Middleware } from 'kavi/server/middleware'
import { it } from '../it'
import z from 'zod'

it("should work", () => {
  const mw = new Middleware(() => ({ something: 123 }))
  const res = mw.args(z.string()).call((args, ctx) => {
    assert<Equals<
      typeof args,
      string
    >>()

    assert<Equals<
      typeof ctx,
      { something: number }
    >>()

    return 123
  })

  assert<Equals<
    typeof res,
    (args: string, needs: object) => number
  >>()
})


