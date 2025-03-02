import { createOptions } from "kavi/options"
import { devalueOption } from "kavi/options/devalue"
import { AnyError } from "kavi/result"
import { describe, expect, it } from "vitest"

class Vector {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

describe("devalue", () => {
  it("should use the devalue options", () => {
    const { devalue } = createOptions({
      devalue: {
        Vector: devalueOption
          .stringify((value) => {
            return value instanceof Vector && [value.x, value.y]
          })
          .parse((coords) => new Vector(...coords)),
      },
    })

    const stringed = devalue.stringify(new Vector(1, 2))
    const parsed = devalue.parse(stringed)

    expect(parsed).toBeInstanceOf(Vector)
  })

  it("should use the default options", () => {
    const { devalue } = createOptions()

    const stringed = devalue.stringify(new AnyError(1))
    const parsed = devalue.parse(stringed)

    expect(parsed).toBeInstanceOf(AnyError)
  })
})
