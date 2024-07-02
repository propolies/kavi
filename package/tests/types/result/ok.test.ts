import { assert, Equals } from 'tsafe'
import { AnyError, KaviError, error } from 'kavi/index'
import { Result } from 'kavi/result'
import { it } from '../it'
import { vi } from 'vitest'

it("should return the result by default", async () => {
  const result = await new Result(() => ({ result: 123 })).ok()

  type Result = typeof result
  assert<Equals<
    Result,
    {
      result: number
    } | undefined
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
  const e = { code: 404 } as const
  const result = await new Result<null, typeof e>(() => error(e)).ok()
  type Result = typeof result
  assert<Equals<
    Equals<
      Result,
      KaviError<{
        readonly code: 404;
      }> | AnyError | undefined
    >,
    false
  >>()
})
