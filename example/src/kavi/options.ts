import { Vector } from "$lib/vector"
import { pipe, type Options } from "kavi"

export const options: Options = {
  devalue: {
    Vector: pipe
      .onStringify((value) => value instanceof Vector && [ value.x, value.y ])
      .onParse((value) => {
        return new Vector(...value)
      })
  }
}