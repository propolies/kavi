---
description: Creating new endpoints as functions.
---

## call
To create new functions (endpoints), use `.call` on any middleware.
```ts
import { middleware } from 'kavi/server'

export const router = {
  // middleware runs before every call
  route: middleware 
    .call(({ event }) => {
      // runs on every call
    })
}
```

To see how it's used check out [First Api](/docs/getting-started/first-api).

## Calling functions
```ts file=client
import { api } from '$lib/kavi/client'

await api.route().ok()
```
calling the function returns a [result](/docs/handling-results/results).
