---
description: Handle forms with ease.
---

## Example
```svelte
<script lang="ts">
  import { Form } from 'kavi/client'
  import { api } from '$lib/kavi/client'
  import z from 'zod'

  const form = Form(api.route, {
    schema: z.object({
      name: z.string(),
      age: z.number().min(18)
    })
  })
</script>

<form onsubmit={form.onsubmit}>
  <input
    name="name"
    aria-invalid={form.errors.name ? true : undefined}
    bind:value={form.fields.name}
  />
  <input
    name="age"
    aria-invalid={form.errors.age ? true : undefined}
    bind:value={form.fields.age}
  />
</form>
```

## Submitting data
Often data in inputs/forms is not exactly what we want to forward to the api. Instead we can use `beforeSubmit` on the `Form` options.

```ts
Form(api.route, {
  schema: {
    x: z.number(),
    y: z.number()
  },
  beforeSubmit: (fields) => new Vector(x, y)
})
```
This is identical to
```ts
api.route(new Vector(x, y))
```

## Errors
The `KaviForm` which is returned from `Form` has the property `errors`. This is used to check which field errors we have.

### Autofocus errors
To autofocus the first error in a form use `aria-invalid`.