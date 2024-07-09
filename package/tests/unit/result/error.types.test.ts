import { assert, Equals } from 'tsafe'
import { AnyError, KaviError, error } from 'kavi/index'
import { Result } from 'kavi/client/result'
import { describe, error404, it } from '../utils.types'

describe("result.types error", () => {
  it("should return the error by default", async () => {
    const error400 = {
      code: 400
    } as const
    const result = await new Result<null, typeof error404 | typeof error400>(() => error(error404)).error()

    type Result = typeof result
    assert<Equals<
      Result,
      KaviError<{
        readonly code: 400;
      }> |
      KaviError<{
        readonly code: 404;
        readonly title: "Not found";
      }> | AnyError | undefined
    >>()
  })

  it("should return the lambda result", async () => {
    const result = await new Result<null, typeof error404>(() => error(error404)).error((e) => {
      assert<Equals<
        typeof e,
        KaviError<{
          readonly code: 404;
          readonly title: "Not found";
        }> | AnyError
      >>()
      return 1
    })
    assert<Equals<
      typeof result,
      number | undefined
    >>()
  })

  it("should have typed data errors", async () => {
    const dataError = {
      code: 1,
      data: {
        fromServer: true
      }
    } as const

    const res = new Result<null, typeof dataError>(() => error(dataError)).error((e) => {
      assert<Equals<
        typeof e,
        KaviError<{
          readonly code: 1,
          readonly data: {
            readonly fromServer: true
          }
        }> | AnyError
      >>()
    })
  })
})