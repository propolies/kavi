import { assert, type Equals } from 'tsafe'
import { all } from 'kavi/server/middleware'
import { describe, it } from '../utils.types'

describe("middleware.types call", () => {
  it("should have default event as needs", () => {
    const res = all.call(() => {})

    assert<Equals<
      typeof res,
      () => Promise<void>
    >>()
  })
})