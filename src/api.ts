export const createClientRouter = async <R extends Object>() => {
  const routerKeys = await fetch("/?api=getRouterKeys").then(res => res.json())
  // @ts-ignore
  return Object.fromEntries(routerKeys.map(route => {
    const fetcher = async (input: object) => await fetch(`/?api=${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input)
      }).then(res => res.json())
    return [route, fetcher]
  })) as ToPromise<R>
}

type ToPromise<T extends Object> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer R 
    ? (...args: Args) => Promise<R> 
    : (
      T[K] extends Object 
        ? ToPromise<T[K]>
        : never
    )
}