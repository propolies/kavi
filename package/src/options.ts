import { KaviError } from "./errors.js"

export type Options = {
  devalue?: DevalueOptions
}

export function getOptions(options: Options | undefined) {
  const devalueOptions = {
    ...options?.devalue,
    ...defaultDevalueOptions
  }
  return {
    ...options,
    devalue: {
      onStringify: getDevalueOptions("onStringify", devalueOptions),
      onParse: getDevalueOptions("onParse", devalueOptions),
    }
  }
}
export type Opts = typeof getOptions

export type DevalueOptions = {
  [K: string]: {
    onStringify: (value: any) => unknown,
    onParse: (value: any) => unknown,
  }
}

export const pipe = {
  onStringify: <const T>(a: (value: any) => T) => ({
    onParse: (b: (value: Exclude<T, false>) => any) => ({
      onStringify: a,
      onParse: b
    })
  })
}

const defaultDevalueOptions = {
  Error: pipe
    .onStringify((value) => value instanceof KaviError && { ...value })
    .onParse((value) => new KaviError(value))
}

export const getDevalueOptions = (
  key: "onStringify" | "onParse",
  devalueOptions?: DevalueOptions
) => devalueOptions && Object.fromEntries(Object.entries(devalueOptions).map(
  ([k, v]) => [k, v[key]])
)