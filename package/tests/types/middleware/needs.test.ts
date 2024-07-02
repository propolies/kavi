/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/ban-types: 0 */

import { assert, Equals } from 'tsafe'
import { Middleware } from 'kavi/server/middleware'
import { it } from '../it'
import type { KaviErrorOptions } from 'kavi/errors'

it("should work without needs", () => {
  const mw = new Middleware(() => ({}))
  type Mw = typeof mw

  assert<Equals<
    Mw,
    Middleware<{}, object, KaviErrorOptions>
  >>()
})

it("should work with needs", () => {
  const mw = new Middleware((needs: { need: number }) => ({}))
  type Mw = typeof mw

  assert<Equals<
    Mw,
    Middleware<{}, { need: number }, KaviErrorOptions>
  >>()
})