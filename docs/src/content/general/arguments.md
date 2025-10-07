---
description:
---

## Args

To accept arguments—use `.args` which takes a `zod` object that validates the input on the server.

```ts
import { all } from 'kavi/server'
import z from 'zod'

all
  .args(z.number())
  .call((args, ctx) => ...)
```

Since `.args` only takes one argument we can use `z.tuple()` or `z.object()` to get more arguments.

### Example

```ts file=server.ts
import { all } from "kavi/server"
import z from "zod"

export const router = {
  add: all
    .args(z.tuple([z.number(), z.number()]))
    .call(([a, b]) => {
      return a + b
    }),
}
```

```svelte file=+page.svelte
<script lang="ts">
  import { api } from "$lib/kavi/client"
</script>

<button
  onclick={async () => {
    const result = await api.add([1, 2]).ok()
  }}>
  Add two numbers on the server
</button>
```
