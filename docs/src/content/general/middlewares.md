---
description: Middlewares are functions that are called on each call
---

The easiest way to make new middleware is with `middleware` and `.use`.
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