---
description: Serializing and deserializing data
---

## Handling arbitrary data
Since everything sent over the wire is converted to `JSON` we can't send anything and get it returned the same. For example `Date` will lose it's structure once converted to `string`.

```ts
middleware
  .call(() => new Date) 
```
To handle returning/sending any data we can use <a href="https://github.com/Rich-Harris/devalue" target="_blank">devalue</a>. 

## Devalue option
Fortunately `devalue` already takes care of `Date`, but here's how we can do it ourselves in a shared options file.
```ts file=kavi/options.ts
import { createOptions, devalueOption } from 'kavi'

export const options = createOptions({
  devalue: {
    Date: devalueOption
      .stringify((value) => {
        if (value instanceof Date) {
          return date.toString()
        }
      })
      .parse((value) => new Date(value))
  }
})