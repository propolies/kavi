---
description: How to pass parameters to functions
---

## Args
To accept parameters we need to use `.args` which takes a `zod` object so we can validate the input.
```ts
import { middleware } from 'kavi/server'
import z from 'zod'

middleware
  .params(z.number())
  .call((arg, ctx) => ...)
```
Since `.arg` only takes one argument we can use `z.tuple()` or `z.object()` to get more arguments. 

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
  Say hello to server!
</button>
```
