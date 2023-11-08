export const createClientRouter = <Router extends object>(props: string[] = []): Router => {
  const fn = function(){return props} as Router
  
  return new Proxy(fn, {
    get: (_, prop: string) => {
      return createClientRouter<Router>([...props, prop])
    },
    apply: (target, _, args) => {
      // @ts-ignore
      const path = target()
      return fetch(`/?api=${path.join(".")}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args)
      }).then(res => res.json())
    }
  })
}

export type Pretty<T> = T extends Function ? T : { [K in keyof T]: Pretty<T[K]> } & {};
export type ToPromise<T extends Object> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer R 
    ? (...args: Args) => Promise<R> 
    : (
      T[K] extends Object 
        ? ToPromise<T[K]>
        : never
    )
}