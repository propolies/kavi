---
description: Loading data with sveltekit
---

## +page.ts
The event context is needed when calling the underlying fetch on both server and client, this is done with `api.with`. 

```ts file=+page.ts
import type { PageLoad } from './$types'
import { api } from '$lib/kavi/client'

export const load: PageLoad = async (event) => {
  await api.with(event).route().ok()
}
```

## +page.server.ts
Simply use the client api from `$lib/kavi/client` as `event.fetch` will be used to bypass http, [read more](https://kit.svelte.dev/docs/load#making-fetch-requests)