import { assert, Equals } from 'tsafe'
import { AnyError, KaviError, error } from 'kavi/index'
import { Result } from 'kavi/client/result'
import { describe, error404, it } from '../utils.types'
import { vi } from 'vitest'

describe('result.types ok', () => {
  it("should return the result by default", async () => {
    const result = await new Result(() => 1).ok()

    type Result = typeof result
    assert<Equals<
      Result,
      number | undefined
    >>()
  })

  it("should return the lambda result", async () => {
    const result = await new Result(vi.fn()).ok(() => 1)
    type Result = typeof result
    assert<Equals<
      Result,
      number | undefined
    >>()
  })

  it("should not return error types", async () => {
    const result = await new Result<number, typeof error404>(() => error(error404)).ok()
    type Result = typeof result
    assert<Equals<
      Result,
      number | undefined
    >>()
  })

})