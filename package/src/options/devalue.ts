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
    _AnyError: devalueOption
      .stringify((value) => value instanceof AnyError && value.error)
      .parse((error) => new AnyError(error)),
    _ZodError: devalueOption
      .stringify((value) => value instanceof ZodError && value.errors)
      .parse((errors) => new ZodError(errors)),
    _Error: devalueOption
      .stringify((v) => v instanceof Error && [v.message, v.cause])
      .parse(([message, cause]) => new Error(message, { cause })),
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
