---
description:
---

A [middleware](/docs/general/middlewares) is the core for any api.

```ts file=server.ts
import { all } from "kavi/server"

export const router = {
  hello: all.call(() => {
    console.log("hello server")
  }),
}
```

Here is where it gets powerful, as we get **end to end typesafety** instanly with no build step.

```svelte file=+page.svelte
<script lang="ts">
  import { api } from "$lib/kavi/client"
</script>

<button
  onclick={async () => {
    await api.hello().ok()
  }}>
  Say hello to server!
</button>
```
