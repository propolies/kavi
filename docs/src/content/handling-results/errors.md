---
description: How to throw errors in Kavi
---

The `KaviError` constructor takes a `KaviErrorOptions` type as argument.
```ts
type KaviErrorOptions = {
  code?: number,
  title?: string,
  description?: string,
  data?: any
}
```

## Throwing errors
To actually "throw" errors simply return them instead and Kavi will handle the rest.
> note: thrown errors will be caught and returned as `AnyError`.

```ts file=server
import { KaviError } from 'kavi'
import { middleware } from 'kavi/server'

middleware
  .call(() => {
    return new KaviError({
      code: 404,
      title: "Not found"
    })
  })
```

## Handling errors
It is recommended to use <a href="https://www.npmjs.com/package/ts-pattern" target="_blank">ts-pattern</a> for handling errors as it makes for easy matching.
```ts file=client
import { match } from 'ts-pattern'
await api.route().error((error) => {
  match(error)
    .with({ code: 404 }, () => {
      console.log("Seems like you are lost")
    })
    .otherwise(() => {
      console.log("Something went wrong")
    })
    .exhaustive() // make sure all cases are handled
})
```