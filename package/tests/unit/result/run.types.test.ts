import { assert, Equals } from "tsafe"
import { AnyError, Result } from "kavi"
import { describe, it } from "../utils.types"

describe("result.types run", () => {
  it("should work", async () => {
    const [_res, error] = await new Result<number>(() => 1).run()

    assert<Equals<typeof _res, number | undefined>>()
    assert<Equals<typeof error, AnyError | undefined>>()

    if (error) {
      assert<Equals<typeof error, AnyError>>()
      return
    }

    assert<Equals<typeof _res, number>>()
  })
})
