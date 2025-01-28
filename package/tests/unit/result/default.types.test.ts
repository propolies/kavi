import { assert, Equals } from 'tsafe'
import { Result } from 'kavi'
import { describe, it } from '../utils.types'

describe("result.types default", () => {
  it("should return the combined types", async () => {
    const result = await new Result(() => 1).default("hey")

    type Result = typeof result
    assert<Equals<
      Result,
      number | string
    >>()
  })
})