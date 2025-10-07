---
description: Functions called on each api call
---

Make new middlewares by [chaining](#chain) or [merging](#merge) the default middleware `all`.

```ts
import { all } from "kavi/server"

const mw = all.chain(() => {
  // runs on every call
  return {} // context
})
```

The returned context will be available to all calls like

```ts
mw.call((ctx) => ...)
```

## Chain

Chaining will call all the previous middlewares in the "chain", only the latest returned context will be available.

```ts
import { all } from "kavi/server"

const mw = all
  .chain(() => {
    return { ctx1: 1 }
  })
  .chain(() => {
    return { ctx2: 2 }
  })
```

## Merge

Merging will call all the previous middlewares in the "chain", and merge the context.
