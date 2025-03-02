import { assert, Equals } from "tsafe"
import { AnyError, Result } from "kavi"
import { describe, it } from "../utils.types"

describe("result.types error", () => {
  it("should return the error by default", async () => {
    const _result = await new Result<number>(() => 1).error()

    type Result = typeof _result
    assert<Equals<Result, AnyError | undefined>>()
  })

  it("should return the lambda result", async () => {
    const _result = await new Result<void>(() => {}).error(() => 1)
    assert<Equals<typeof _result, number | undefined>>()
  })
})
