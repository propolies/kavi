import { assert, Equals } from 'tsafe'
import { AnyError, KaviError } from 'kavi/index'
import { Result } from 'kavi/client/result'
import { describe, it } from '../utils.types'

type Res = string
type E = { code: 404 }

const result = new Result<Res, E>(() => "result")

describe("result.types match", () => {
  it("should return default error", async () => {
    const res = await result.match({
      ok: () => 1
    })

    type R = typeof res
    assert<Equals<
      R,
      number | (KaviError<E> | AnyError)
    >>()
  })

  it("should return default ok", async () => {
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
      ok: () => "ok",
      error: () => 1
    })

    type R = typeof res
    assert<Equals<
      R,
      string | number
    >>()
  })
})