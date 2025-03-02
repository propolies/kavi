import { assert, type Equals } from "tsafe"
import { all } from "kavi/server/middleware"
import { describe, it } from "../utils.types"

describe("middleware.types call", () => {
  it("should have default event as needs", () => {
    const _res = all.call(() => {})

    assert<Equals<typeof _res, () => Promise<void>>>()
  })
})
