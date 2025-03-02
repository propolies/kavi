import { assert, Equals } from "tsafe"
import { all } from "kavi/server/middleware"
import { describe, it } from "../utils.types"
import z from "zod"

describe("middleware.test args", () => {
  it("should get args types", () => {
    const _call = all.args(z.string()).call((_args) => {
      assert<Equals<typeof _args, string>>()

      return 1
    })

    assert<Equals<typeof _call, (args: string) => Promise<number>>>()
  })
})
