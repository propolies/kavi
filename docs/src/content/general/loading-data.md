---
description: Loading data with sveltekit
---

The event context is needed when calling the underlying fetch on both server and client, this is done with `api.with`. 

```ts file=+page.ts/+page.server.ts
import type { PageLoad } from './$types'
import { api } from '$lib/kavi/client'

export const load: PageLoad = async (event) => {
  await api.with(event).route().ok()
}
```

When on the server the `event.fetch` will be used to bypass http, [read more](https://kit.svelte.dev/docs/load#making-fetch-requests)