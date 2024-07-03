import { assert, Equals } from 'tsafe'
import { Result } from 'kavi/result'
import { it } from '../it'

it("should have value as returntype", async () => {
  const e = {
    code: 404,
    title: "Not found"
  } as const
  const result = await new Result<1, typeof e>(() => 1).expect()

  type Result = typeof result
  assert<Equals<
    Result,
    1
  >>()
})