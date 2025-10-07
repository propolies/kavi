---
description: The SvelteKit RequestEvent
---

## Getting The Event Context

We can get the `event` context everywhere in the scope of `hooks.server.ts`.

```ts
import { all, ctx } from "kavi/server"

const user = all.chain(() => {
  const session = ctx.event.cookies.get("user")
  const user = validateSession(session)
  return {
    user,
  }
})
```

> `ctx` can only be accesed on the server.
