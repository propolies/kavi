---
description: How to create custom middlewares that run on each call.
---

Create a custom middleware from the default shipped `middleware` using `.use`.
```ts
import { middleware } from 'kavi/server'

const mw = middleware
  .use(({ event }) => {
    // runs on every call
    return { cookies }
  })

mw.call(({ cookies }) => ...)
```
> note: only the returned context, will be available when using call