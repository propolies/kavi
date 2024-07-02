import { assert, Equals } from 'tsafe'
import { AnyError, KaviError, ExtractErrorOptions, error } from 'kavi/index'
import { Result } from 'kavi/result'
import { it } from '../it'
import { match, P } from 'ts-pattern'

it("should return the error by default", async () => {
  const e = {
    code: 404,
    title: "Not found"
  } as const
  const result = await new Result<null, typeof e>(() => error(e)).error()

  type Result = typeof result
  assert<Equals<
    Result,
    KaviError<{
      readonly code: 404;
      readonly title: "Not found";
    }> | AnyError | undefined
  >>()
})

it("should return the lambda result", async () => {
  const e = {
    code: 404,
    title: "Not found"
  } as const
  const result = await new Result<null, typeof e>(() => error(e)).error((e) => {
    type E = typeof e
    assert<Equals<
      E,
      KaviError<{
        readonly code: 404;
        readonly title: "Not found";
      }> | AnyError
    >>()
    return 1
  })
  type Result = typeof result
  assert<Equals<
    Result,
    number | undefined
  >>()
})

it("example", async () => {
  function fn(n: number) {
    const r = Math.random()
    if (r == 0) {
      return error({
        code: 400,
        title: "Division by zero"
      })
    }

    if (r < .5) {
      return error({
        code: 400,
        title: "No negative numbers",
        description: "To use negative numbers use ... instead"
      })
    }

    if (r > 0.5) {
      return error({
        code: 404,
        title: "Not found"
      })
    }

    return n / 2
  }

  // TODO
  type Errors = ExtractErrorOptions<typeof fn>
  new Result<number, Errors>(() => fn(0)).error((e) => {
    match(e)
      .with({ code: 400 }, (e) => {

      })
      .with(P.instanceOf(AnyError), (e) => {
        e.error
      })
  })
})