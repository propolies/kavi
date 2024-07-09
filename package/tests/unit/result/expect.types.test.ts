import { assert, Equals } from 'tsafe'
import { Result } from 'kavi/client/result'
import { describe, error404, it } from '../utils.types'

describe("result.types expect", () => {
  it("should have value as returntype", async () => {
    const result = await new Result<1, typeof error404>(() => 1).expect()

    type Result = typeof result
    assert<Equals<
      Result,
      1
    >>()
  })
})