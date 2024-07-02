/* eslint @typescript-eslint/no-unused-vars: 0 */
import { assert, Equals } from 'tsafe'
import { Middleware } from 'kavi/server/middleware'
import { it } from '../it'
import type { KaviErrorOptions } from 'kavi/errors'

it("should overwrite old context", () => {
  const mw = new Middleware(() => ({ old: 123 }))
    .use(() => {
      return {
        new: "hey"
      }
    })

  assert<Equals<
    typeof mw,
    Middleware<{ new: string }, object, KaviErrorOptions>
  >>()
})
