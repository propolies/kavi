export const createClientRouter = <Router extends object>(props: string[] = []): Router => {
  const fn = function(){ return props } as Router
  
  return new Proxy(fn, {
    get: (_, prop: string) => {
      return createClientRouter<Router>([...props, prop])
    },
    apply: (target, _, args) => {
      // @ts-ignore
      const path = target()
      return fetch(`/svelte-api?api=${path.join(".")}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args[0] ?? null)
      }).then(res => res.json())
    }
  })
}
