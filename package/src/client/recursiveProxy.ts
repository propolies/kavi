export function createRecursiveProxy<T extends object>(
  apply: (args: {
    path: string[],
    args: unknown[],
  }) => void,
  target?: any
): T {
  function createProxy(path: string[]): T {
    // @ts-expect-error "Fake type"
    const obj: T = () => (target ?? {})
    return new Proxy(obj, {
      get: (_, prop: string) => {
        return createProxy([...path, prop])
      },
      apply: ($, $$, args) => apply({
        path,
        args,
      })
    })
  }
  return createProxy([])
}
