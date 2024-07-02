---
description: "The setup needed for websockets to work"
---

## Install
```
pnpm add svelte-ws
```
or
```
npm install svelte-ws
```

## Vite config
We need to add the `wss` plugin to the vite config.
```ts file=vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { wss } from 'svelte-ws/vite'

export default defineConfig({
  plugins: [wss(), sveltekit()]
});
```
```ts file=server.ts
import { createWss } from 'kavi'

export const wss = createWss({})
export type Wss = typeof wss
```

```ts file=client.ts
import { createWsClient } from 'kavi'
import type { Wss } from '$lib/kavi/server.ts'

export const Ws = createWsClient<Wss>()
```

```ts file=hooks.server.ts
import { createHandle } from 'kavi'
import { api, wss } from '$lib/kavi/server'

export const handle = createHandle(api, wss)
```