type MaybePromise<T> = Promise<T> | T

type AnyFunc = (...args: any[]) => any

type Pretty<T> = T extends Function
  ? T
  : { [K in keyof T]: Pretty<T[K]> } & {}

export type {
  MaybePromise,
  AnyFunc,
  Pretty
}
