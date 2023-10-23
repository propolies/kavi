export const createClientRouter = async <R extends Object>() => {
  const routerKeys = await fetch("/?api=getRouterKeys").then(res => res.json()) as object
  // @ts-ignore
  return createRouter(Object.entries(routerKeys), []) as Pretty<ToPromise<R>>
}

export type Client<Router extends Object> = Awaited<ReturnType<typeof createClientRouter<Router>>>

const createRouter = (entries: [string, object | ""][], path: string[]): object => Object.fromEntries(entries.map(([route, value]) => {
  return [route, value ? createRouter(Object.entries(value),  [...path, route]) : createFetcher([...path, route]) ]
}))

const createFetcher = (path: string[]) => async (input: any) => await fetch(`/?api=${path.join(".")}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(input)
}).then(res => res.json())

type Pretty<T> = T extends Function ? T : { [K in keyof T]: Pretty<T[K]> } & {};
type ToPromise<T extends Object> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer R 
    ? (...args: Args) => Promise<R> 
    : (
      T[K] extends Object 
        ? ToPromise<T[K]>
        : never
    )
}