/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from 'vitest'
import { error } from 'kavi'
import { Result } from 'kavi/client/result'

describe('results run', () => {
  it("should return the error", async () => {
    const [value, e] = await new Result(() => error({})).run()

    expect(e).toEqual(error({}))
    expect(value).toEqual(undefined)
  })

  it("should return the value", async () => {
    const [value, e] = await new Result(() => 1).run()

    expect(e).toEqual(undefined)
    expect(value).toEqual(1)
  })
})