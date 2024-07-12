import { ZodError } from "zod"
import * as devalue from "devalue"
import { AnyError } from "../result"

export type DevalueOptions = Record<string, {
  stringify: (value: any) => any,
  parse: (value: any) => any,
}>

const extractEntries = (
  key: string,
  object: object
) => Object.fromEntries(Object.entries(object).map(
  ([k, v]) => [k, v[key]])
)

export const devalueOption = {
  stringify: <const T>(a: (value: unknown) => T) => ({
    parse: (b: (value: Exclude<T, false>) => unknown) => ({
      stringify: a,
      parse: b
    })
  })
}

export function getDevalue(options?: DevalueOptions) {
  const defaultDevalueOptions = {
    AnyError: devalueOption
      .stringify((value) => value instanceof AnyError && value.error)
      .parse((error) => new AnyError(error)),
    ZodError: devalueOption
      .stringify((value) => value instanceof ZodError && value.errors)
      .parse((errors) => new ZodError(errors))
  }

  const devalueOptions = {
    ...options,
    ...defaultDevalueOptions
  }

  return {
    stringify: (value: unknown) => devalue.stringify(
      value,
      extractEntries("stringify", devalueOptions)
    ),
    parse: (value: string) => devalue.parse(
      value,
      extractEntries("parse", devalueOptions)
    ),
  }
}
