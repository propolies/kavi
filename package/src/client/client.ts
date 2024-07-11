import { createRecursiveProxy } from "./recursiveProxy.js"
import { Result } from "./result.js"
import type { ExtractErrorOptions, Pretty, RemoveErrorOptions } from "../types.js"
import type { RequestEvent } from "@sveltejs/kit"
import type { Options } from "../options/options.js"

type AwaitedFunc<T> = T extends (...args: infer Args) => infer R
  ? (...args: Args) => Awaited<R>
  : never

type ToResult<T extends object> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => any
    ? (...args: Args) => Result<RemoveErrorOptions<AwaitedFunc<T[K]>>, ExtractErrorOptions<AwaitedFunc<T[K]>>>
    : T[K] extends object
      ? ToResult<T[K]>
      : never
}

type IsOptional<T, K extends keyof T> = {} extends Pick<T, K> ? true : false
type AllOptional<T> = keyof T extends infer K
  ? K extends keyof T
    ? IsOptional<T, K>
    : never
  : never

type OmitEvent<T extends object> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer R
    ? Args extends [infer Needs]
      ? keyof Omit<Needs, "event"> extends never
        ? () => R
        : AllOptional<Omit<Needs, "event">> extends true
          ? (needs?: Omit<Needs, "event">) => R
          : (needs: Omit<Needs, "event">) => R
      : Args extends [infer Arg, infer Needs]
        ? keyof Omit<Needs, "event"> extends never
          ? (arg: Arg) => R
          : AllOptional<Omit<Needs, "event">> extends true
            ? (arg: Arg, needs?: Omit<Needs, "event">) => R
            : (arg: Arg, needs: Omit<Needs, "event">) => R
        : never
    : T[K] extends object
      ? OmitEvent<T[K]>
      : never
}

export type LoadEvent = {
  fetch: RequestEvent["fetch"],
  setHeaders: RequestEvent["setHeaders"]
}

type ApiClient<T extends object> = Pretty<ToResult<OmitEvent<T>>>
export function createApiClient<T extends object>(options: Options) {
  let loadEvent: LoadEvent
  return createRecursiveProxy<{ with: (event: LoadEvent) => ApiClient<T> } & ApiClient<T>>(({ args, path }) => {
    if (path[0] === "with") {
      loadEvent = args[0] as LoadEvent
      return createRecursiveProxy<ApiClient<T>>(({ args, path }) => {
        return handleApply({ args, path, loadEvent, options })
      })
    }
    return handleApply({ args, path, options })
  })
}

function handleApply({ args, path, loadEvent, options }: {
  args: unknown[],
  path: string[],
  loadEvent?: LoadEvent,
  options: Options
}) {
  const _fetch = loadEvent?.fetch ?? globalThis._fetch ?? fetch
  return new Result(() => _fetch(`/kavi?api=${path.join(".")}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: options.devalue.stringify(args[0])
  }).then(async (res) => options.devalue.parse(await res.text())))
}