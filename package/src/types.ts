import { Result } from "./result.js";

export type Pretty<T> = T extends Function ? T : { [K in keyof T]: Pretty<T[K]> } & {};
export type ToAsync<T extends Function> = T extends (...args: infer Args) => (Promise<infer R> | infer R)
  ? (...args: Args) => Promise<R> 
  : never
export type ToPromise<T extends object> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any 
    ? ToAsync<T[K]>
    : (
      T[K] extends object 
        ? ToPromise<T[K]>
        : never
    )
}

export type ExcludeEvent<T extends object> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer R
    ? Args extends [args: infer Args, ...needs: infer Needs]
      ? (args: Args) => R
      : () => R
    : (
      T[K] extends Object 
        ? ExcludeEvent<T[K]>
        : never
    )
}
export type ToResult<T extends object> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => (Promise<infer R> | infer R)
    ? (...args: Args) => Result<R>
    : (
      T[K] extends Object 
        ? ToResult<T[K]>
        : never
    )
}

export type ClientRouter<R extends object> = Pretty<ToPromise<ToResult<ExcludeEvent<R>>>>

export type Err = { error?: string }