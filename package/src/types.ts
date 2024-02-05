import type { RequestEvent } from "@sveltejs/kit";

export type Pretty<T> = T extends Function ? T : { [K in keyof T]: Pretty<T[K]> } & {};

export type ToAsync<T extends Function> = T extends (...args: infer Args) => (Promise<infer R> | infer R)
  ? (...args: Args) => Promise<R> 
  : never

export type ToPromise<T extends object> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any 
    ? ToAsync<T[K]>
    : (
      T[K] extends Object 
        ? ToPromise<T[K]>
        : never
    )
}

export type ExcludeEvent<T extends object> = {
  [K in keyof T]: T[K] extends (...input: infer Input) => infer R
    ? Input extends [args: infer Args, ...needs: infer Needs]
      ? (args: Args) => R
      : () => R
    : (
      T[K] extends Object 
        ? ExcludeEvent<T[K]>
        : never
    )
}

export type ClientRouter<R extends object> = Pretty<ToPromise<ExcludeEvent<R>>>