---
description: Middlewares are functions that are called on each call
---

The easiest way to make new middleware is combining the default middleware `all` with [.chain](#chain) or [.merge](#merge).

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

Chaining will call all the previous middlewares in the "chain", only the latest returned context will be available. To have all context of the previous middlewares use [merge](#merge)

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

The returned context will be available to all calls like

```ts
mw.call((ctx) => ...)
```

## Merge

Merging will call all the previous middlewares in the "chain", all context of the previous middlewares will be available.
