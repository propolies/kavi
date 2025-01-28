import { createRecursiveProxy } from "./recursiveProxy.js"
import { Result } from "../result.js"
import type { Pretty } from "../types.js"
import type { Options } from "../options/options.js"
import { LoadEvent } from "@sveltejs/kit"

type ToResult<T extends object> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => any
    ? (...args: Args) => Result<Awaited<ReturnType<T[K]>>>
    : T[K] extends object
      ? ToResult<T[K]>
      : never
}

type ApiClient<T extends object> = Pretty<ToResult<T>>
export function createApiClient<T extends object>(options: Options) {
  return createRecursiveProxy<ApiClient<T>>(({ args, path }) => {
    return handleApply({ args, path, options })
  })
}

function handleApply({ args, path, options }: {
  args: unknown[],
  path: string[],
  options: Options
}) {
  const _fetch = globalThis.ctx?.event.fetch ?? fetch
  return new Result(() => _fetch(`/kavi?api=${path.join(".")}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: options.devalue.stringify(args[0])
  }).then(async (res) => options.devalue.parse(await res.text())))
}

export function initClientEvent(event: LoadEvent) {
  if (typeof window === "undefined") return

  globalThis.ctx = {
    // @ts-expect-error Should find a better way to isole only fetch
    event
  }
}