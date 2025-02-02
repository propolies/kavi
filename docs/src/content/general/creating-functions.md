---
description: Functions are endpoints that can later be called on the client.
---

## call

To create new functions (endpoints), use `.call` on any middleware.

```ts
import { all } from "kavi/server"

export const router = {
  // the "all" middleware runs before every call
  route: all.call(() => {
    // runs on each request
  }),
}
```

To see how it's used check out [First Api](/docs/getting-started/first-api).

## Calling functions

```ts file=client
import { api } from "$lib/kavi/client"

await api.route().ok()
```

calling the function returns a [result](/docs/handling-results/results).
