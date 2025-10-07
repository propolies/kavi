---
description: Functions are endpoints that can be called on the client.
---

## call

To create new functions (endpoints)—use `.call` on any middleware.

```ts file=server
import { all } from "kavi/server"

export const router = {
  // the "all" middleware runs before every call
  route: all.call(() => {
    // runs on each request
  }),
}
```

To see how—check out [Example](/docs/getting-started/example).

## Calling functions

API functions can be called on both client and server.

```ts file=client
import { api } from "$lib/kavi/client"

await api.route().ok()
```

calling the function returns a [result](/docs/handling-results/results).
