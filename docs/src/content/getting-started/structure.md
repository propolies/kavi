---
description: Heres the recommended project structure.
---

## Setup with Cli

```
npx kavi init
```

> This will overwrite `hooks.server.ts` and the other files mentioned below.

## Setup manually

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

```ts file=options.ts
import { createOptions } from "kavi"
export const options = createOptions()
```

The `server.ts` file is where all the API endpoints will be exported.

```ts file=server.ts
export const router = {}
export type Router = typeof router
```

The `client.ts` file is where the client proxy is defined and will not be modified often.

```ts file=client.ts
import { createApiClient } from "kavi/client"
import { options } from "./options"
import type { Router } from "$lib/kavi/server"

export const api = createApiClient<Router>(options)
```

The `+layout.ts` file is where we need to make sure that load functions use the correct event. This should be the very root layout file.

```ts file=layout.ts
import { initClientEvent } from "kavi/client"

// important that this runs first
export const load = initClientEvent
```

Finally the `hooks.server.ts` is for Kavi to get all the http requests. This will not be modified much either.

```ts file=hooks.server.ts
import { createHandle } from "kavi/server"
import { router } from "$lib/kavi/server"
import { options } from "$lib/kavi/options"

export const handle = createHandle(router, options)
```
