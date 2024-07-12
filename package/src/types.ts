type MaybePromise<T> = Promise<T> | T

type AnyFunc = (...args: any[]) => any

type Pretty<T> = T extends Function
  ? T
  : { [K in keyof T]: Pretty<T[K]> } & {}

type OmitRecursive<T extends Record<string, unknown>, K extends string> = Pretty<K extends `${infer H}.${infer R}`
  ? {
    [Key in keyof T]: T[Key] extends Record<string, unknown>
      ? OmitRecursive<T[Key], R>
      : T[Key]
  }
  : Omit<T, K>>

export type {
  MaybePromise,
  AnyFunc,
  Pretty,
  OmitRecursive
}
