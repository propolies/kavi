---
description: Heres the recommended project structure.
---
```ts
📂src
┣ hooks.server.ts
┗ 📂lib
  ┗ 📂kavi
    ┣ client.ts
    ┣ options.ts // not necessary
    ┗ server.ts
```
Copy paste the following into the proper files
```ts file=server.ts
export const router = {}
export type Router = typeof router
```

```ts file=client.ts
import { createApiClient } from 'kavi/client'
import type { Router } from '$lib/kavi/server'

export const api = createApiClient<Router>()
```

```ts file=hooks.server.ts
import { createHandle } from 'kavi/server'
import { api } from '$lib/kavi/server'

export const handle = createHandle(api)
```