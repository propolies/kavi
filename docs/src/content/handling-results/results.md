---
description: How to handle results in Kavi.
---

A `Result` object will always be returned when calling the API. This allows us to handle errors in a typesafe and functional approach.

## Use case
Say we want to update a user, but only if all goes well. 
```svelte file=+page.svelte
<script lang="ts">
  import { api } from '$lib/kavi/client'
  import { user } from '$lib/stores'

  await api.getUser()
    .ok((user) => $user = user)
</script>
```

## Result class
The following is a list of methods on the `Result` object.

### ok
Will run only if no error has occured.
```ts
await api.route()
  .ok()
  // or
  .ok((result) => ...)
```

### error
Will run only if an error has occured.
```ts
await api.route()
  .error()
  // or
  .error((error) => /* typed error */ )
```
See how you can handle [errors](/docs/handling-results/errors).

### match
handle both `ok` and `error`, it returns whatever the handlers return types are, making it useful for default values.
```ts
await api.route().match({
  ok(result) {},
  error(error) {}
})
```

### run
return early and prevent callbacks.
```ts
const [res, error] = await api.route().run()
if (error) return
// do something with the result
```

### expect
Will throw errors and expect the value to be non interupted.