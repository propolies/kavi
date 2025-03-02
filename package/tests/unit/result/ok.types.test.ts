import { assert, Equals } from "tsafe"
import { Result } from "kavi"
import { describe, it } from "../utils.types"
import { vi } from "vitest"

describe("result.types ok", () => {
  it("should return the result by default", async () => {
    const _result = await new Result(() => 1).ok()

    type Result = typeof _result
    assert<Equals<Result, number | undefined>>()
  })

  it("should return the lambda result", async () => {
    const _result = await new Result(vi.fn()).ok(() => "1")
    type Result = typeof _result
    assert<Equals<Result, string | undefined>>()
  })
})
