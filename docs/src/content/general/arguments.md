---
description: How to pass arguments to functions
---

## Args
To accept arguments we need to use `.args` which takes a `zod` object so we can validate the input.
```ts
import { middleware } from 'kavi/server'
import z from 'zod'

middleware
  .args(z.number())
  .call((args, ctx) => ...)
```
Since `.args` only takes one argument we can use `z.tuple()` or `z.object()` to get more arguments. 

### Example
```ts file=server.ts
import { middleware } from 'kavi/server'
import z from 'zod'

export const router = {
  add: middleware
    .args(z.tuple([
      z.number(),
      z.number()
    ]))
    .call(([a, b]) => {
      return a + b
    })
}
```
```svelte file=+page.svelte
<script lang="ts">
  import { api } from '$lib/kavi/client'
</script>

<button onclick={async () => {
  await api.add([1, 2]).ok()
}}>
  Add two numbers on the server
</button>
```
