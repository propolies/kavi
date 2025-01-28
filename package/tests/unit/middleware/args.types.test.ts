import { assert, Equals } from 'tsafe'
import { all } from 'kavi/server/middleware'
import { describe, it } from '../utils.types'
import z from 'zod'

describe("middleware.test args", () => {
  it("should get args types", () => {
    const call = all
      .args(z.string()).call((args) => {
        assert<Equals<
          typeof args,
          string
        >>()

        return 1
      })

    assert<Equals<
      typeof call,
      (args: string) => Promise<number>
    >>()
  })
})