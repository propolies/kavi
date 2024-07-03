---
description: Get started with the api
---

To write your first api with kavi you need a [middleware](/docs/general/middlewares).
```ts file=server.ts
import { middleware } from 'kavi/server'

export const router = {
  hello: middleware
    .call(() => {
      console.log("hello server")
    })
}
```

Here's where it get's powerful, as we get **end to end typesafety**.

```svelte file=+page.svelte
<script lang="ts">
  import { api } from '$lib/kavi/client'
</script>

<button onclick={async () => {
  await api.hello().ok()
}}>
  Say hello to server!
</button>
```