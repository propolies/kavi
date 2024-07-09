import { assert, Equals } from 'tsafe'
import { AnyError, KaviError } from 'kavi'
import { Result } from 'kavi/client/result'
import { describe, error404, it } from '../utils.types'

describe('result.types run', () => {
  it("should work if error", async () => {
    const [res, error] = await new Result<number, typeof error404>(() => 1).run()

    assert<Equals<
      typeof res,
      number | undefined
    >>()

    assert<Equals<
      typeof error,
      KaviError<typeof error404> | AnyError | undefined
    >>()

    if(error) return

    type Result = typeof res
    assert<Equals<
      Result,
      number
    >>()
  })
})