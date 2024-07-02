import type { KaviError } from "./errors.js"

type Obj = Record<string, unknown>
type MaybePromise<T> = Promise<T> | T

type ExtractErrorOptions<T extends Function> = T extends (...args: any[]) => infer R
  ? R extends KaviError<infer Options>
    ? Options
    : never
  : never

type RemoveErrorOptions<T extends Function> = T extends (...args: any[]) => infer R
  ? R extends KaviError<any>
    ? never
    : R
  : never

type AnyFunc = (...args: any[]) => any

type Pretty<T> = T extends Function
  ? T
  : { [K in keyof T]: Pretty<T[K]> } & {}

export type {
  Obj,
  MaybePromise,
  ExtractErrorOptions,
  RemoveErrorOptions,
  AnyFunc,
  Pretty
}
