---
description: 
---
To get the event context which is normally forwarded from either `hooks.server.ts` or any `load functions`.

## Getting The Event Context
We can get the `event` context everywhere in the scope of the `hooks.server.ts` by importing it from **Kavi**.
```ts
import { all, ctx } from 'kavi'

const user = all
  .chain(() => {
    const session = ctx.event.cookies.get("user")
    const user = validateSession(session)
    return {
      user
    }
  })
```
> Accessing the `ctx` object should of course only be done on the **server**.