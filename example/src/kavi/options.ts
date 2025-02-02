import { Vector } from "$lib/vector"
import { devalueOption, createOptions } from "kavi"

export const options = createOptions({
  devalue: {
    Vector: devalueOption
      .stringify((value) => value instanceof Vector && [value.x, value.y])
      .parse((value) => new Vector(...value)),
  },
})
