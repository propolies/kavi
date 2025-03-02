---
description: Serializing and deserializing data
---

## Handling arbitrary data

Since everything sent over the wire are basically strings, we can't send anything and get it returned the same. I.e `Date` will lose it's structure once converted to `string`.

```ts
const date = new Date()
// Tue Nov 05 2024 10:58:45 GMT+0100 (Central European Standard Time)
date.toString()
```

But the server/client both need to know how to convert this string into the expected object.

```ts
middleware
  // will send date.toString()
  .call(() => new Date())
```

To handle returning/sending any data we can use <a href="https://github.com/Rich-Harris/devalue" target="_blank">devalue</a> which SvelteKit already uses.

## Devalue option

Fortunately `devalue` already takes care of `Date`, but here's how we can do it ourselves in a shared options file.

```ts file=kavi/options.ts
import { createOptions, devalueOption } from "kavi"

export const options = createOptions({
  devalue: {
    Date: devalueOption
      .stringify((value) => {
        if (value instanceof Date) {
          return date.toString()
        }
      })
      .parse((value) => new Date(value)),
  },
})
```

We have now made sure that both server and client agree on how to handle `Date`.

## Transport Hook

Since **sveltekit 2.11.0** you can also make the marshalling work for returned data in `load functions` you need to add the devalue options to

```ts file=hooks.ts
import { ??? } from './kavi/options'
import type { Transport } from '@sveltejs/kit'

export const transport: Transport = ???
```
