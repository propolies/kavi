import type { Result } from "./result"

type MaybePromise<T> = Promise<T> | T

type AnyFunc = (...args: any[]) => any

type Pretty<T> = T extends Function ? T : { [K in keyof T]: Pretty<T[K]> } & {}

type Returns<api extends (...args: unknown[]) => unknown> = api extends (
  ...args: unknown[]
) => Result<infer R>
  ? Awaited<R>
  : never

type Dict = Record<string, unknown>

export type { MaybePromise, AnyFunc, Pretty, Returns, Dict }
