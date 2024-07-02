import { assert, Equals } from 'tsafe'
import { AnyError, KaviError } from 'kavi/index'
import { Result } from 'kavi/result'
import { it } from '../it'

type Res = string
type E = { code: 404 }

const result = new Result<Res, E>(() => "result")

it("should return the result", async () => {
  const res = await result.match({
    ok: () => 1
  })

  type R = typeof res
  assert<Equals<
    R,
    number | (KaviError<E> | AnyError)
  >>()
})

it("should return the result", async () => {
  const res = await result.match({
    error: () => 1
  })

  type R = typeof res
  assert<Equals<
    R,
    Res | number
  >>()
})

it("should return a combination", async () => {
  const res = await result.match({
    ok: () => new Date,
    error: () => 1
  })

  type R = typeof res
  assert<Equals<
    R,
    Date | number
  >>()
})