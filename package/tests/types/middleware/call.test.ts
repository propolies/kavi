/* eslint @typescript-eslint/no-unused-vars: 0 */
import { assert, Equals } from 'tsafe'
import { Middleware } from 'kavi/server/middleware'
import { it } from '../it'

it("should work without needs", () => {
  const mw = new Middleware(() => ({}))
  const res = mw.call(() => {
    return 123
  })

  // todo should be empty object
  assert<Equals<
    typeof res,
    (needs: object) => number
  >>()
})

it("should work with needs", () => {
  const mw = new Middleware((needs: { something: number }) => ({}))
  const res = mw.call(() => {
    return 123
  })

  assert<Equals<
    typeof res,
    (needs: { something: number }) => number
  >>()
})

it("should have the right context", () => {
  new Middleware(() => ({ number: 1 }))
    .call((ctx) => {
      assert<Equals<
        typeof ctx,
        { number: number }
      >>()

      // should complain if ctx does not exist
      assert<Equals<
        Equals<
          typeof ctx,
          { number: number, nonExistent: unknown }
        >,
        false
      >>()
    })
})

it("should have the right context with needs", () => {
  new Middleware((needs: { number2: number }) => ({ number1: 1 }))
    .call((ctx) => {
      assert<Equals<
      typeof ctx,
      { number1: number, number2: number }
    >>()
    })
})