---
description: Heres the recommended project structure.
---
## Setup with Cli
```
npx kavi init
```
> This will overwrite `hooks.server.ts`


## Setup manually
```ts
📂src
┣ hooks.server.ts
┗ 📂lib
  ┗ 📂kavi
    ┣ client.ts
    ┣ options.ts
    ┗ server.ts
```
```ts file=options.ts
import { createOptions } from 'kavi'
export const options = createOptions()
```

The `server.ts` file is where all the API endpoints will be exported.
```ts file=server.ts
export const router = {}
export type Router = typeof router
```
The `client.ts` file is where the client proxy is defined and will not be modified often.
```ts file=client.ts
import { createApiClient } from 'kavi/client'
import { options } from './options'
import type { Router } from '$lib/kavi/server'

export const api = createApiClient<Router>(options)
```
Finally the `hooks.server.ts` is for Kavi to get all the http requests. This will not be modified much either.
```ts file=hooks.server.ts
import { createHandle } from 'kavi/server'
import { router } from '$lib/kavi/server'
import { options } from '$lib/kavi/options'

export const handle = createHandle(router, options)
```