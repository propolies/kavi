import { assert, type Equals } from "tsafe"
import { all } from "kavi/server/middleware"
import { describe, it } from "../utils.types"

describe("middleware.types merge", () => {
  it("should keep old context", () => {
    all
      .merge(() => ({ old: "old" }))
      .merge(() => ({ new: 1 }))
      .call((_ctx) => {
        assert<Equals<typeof _ctx, { old: string; new: number }>>()
      })
  })

  it("should work with async", () => {
    all
      .merge(async () => ({ old: 1 }))
      .merge(async () => ({ new: 2 }))
      .call((_ctx) => {
        assert<Equals<typeof _ctx, { old: number; new: number }>>()
      })
  })
})
