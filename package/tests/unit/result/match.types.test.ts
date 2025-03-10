import { assert, Equals } from "tsafe"
import { AnyError, Result } from "kavi"
import { describe, it } from "../utils.types"

const result = new Result<number>(() => 1)

describe("result.types match", () => {
  it("should return default error", async () => {
    const _res = await result.match({
      ok: () => 1,
    })

    type R = typeof _res
    assert<Equals<R, number | AnyError>>()
  })

  it("should return default ok", async () => {
    const _res = await result.match({
      error: () => "str",
    })

    type R = typeof _res
    assert<Equals<R, number | string>>()
  })

  it("should return a combination", async () => {
    const _res = await result.match({
      ok: () => "ok",
      error: () => new Date(),
    })

    type R = typeof _res
    assert<Equals<R, string | Date>>()
  })
})
