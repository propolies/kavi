import type { RequestEvent } from "@sveltejs/kit";
import type { WebSocketServer } from "ws";

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
  [K in keyof T]: T[K] extends (event: RequestEvent, ...args: infer Args) => infer R
    ? (...args: Args) => R
    : (
      T[K] extends Object 
        ? ExcludeEvent<T[K]>
        : never
    )
}

export type ClientRouter<R extends object> = Pretty<ToPromise<ExcludeEvent<R>>>

export type ExtendedGlobal = typeof globalThis & {
  wss: WebSocketServer
}