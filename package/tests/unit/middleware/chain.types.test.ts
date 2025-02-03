import { assert, type Equals } from "tsafe"
import { all } from "kavi/server/middleware"
import { describe, it } from "../utils.types"

describe("middleware.types use", () => {
  it("should overwrite old context", () => {
    all
      .chain(() => ({ old: "old" }))
      .chain(() => ({ new: 1 }))
      .call((_ctx) => {
        assert<Equals<typeof _ctx, { new: number }>>()
      })
  })

  it("should work with async", () => {
    all
      .chain(async () => ({ new: 1 }))
      .call((_ctx) => {
        assert<Equals<typeof _ctx, { new: number }>>()
      })
  })
})
