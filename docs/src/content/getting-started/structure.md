---
description: The recommended project structure.
---

```ts
📂src
┣ hooks.server.ts
┗ 📂lib
  ┗ 📂kavi
    ┣ client.ts
    ┣ options.ts
    ┗ server.ts
┗ 📂routes
  ┗ +layout.ts
```

Copy the following code into your project

```ts file=options.ts
import { createOptions } from "kavi"
export const options = createOptions()
```

```ts file=server.ts
import { all } from "kavi/server"
import z from "zod"

export const router = {}
export type Router = typeof router
```

```ts file=client.ts
import { createApiClient } from "kavi/client"
import { options } from "./options"
import type { Router } from "$lib/kavi/server"

export const api = createApiClient<Router>(options)
```

```ts file=layout.ts
import { initClientEvent } from "kavi/client"

// important that this runs first
export const load = initClientEvent
```

```ts file=hooks.server.ts
import { createHandle } from "kavi/server"
import { router } from "$lib/kavi/server"
import { options } from "$lib/kavi/options"

export const handle = createHandle(router, options)
```
