import { assert, Equals } from 'tsafe'
import { AnyError } from 'kavi'
import { Result } from 'kavi/result'
import { it } from '../it'

it("should work", async () => {
  const [res, error] = await new Result<number, never>(() => 1).run()

  assert<Equals<
    typeof res,
    number | undefined
  >>()

  assert<Equals<
    typeof error,
    AnyError | undefined
  >>()

  if(error) return
  res

  type Result = typeof res
  assert<Equals<
    Result,
    number
  >>()
})
