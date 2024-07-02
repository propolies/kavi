---
description: Serializing and deserializing data
---

## Handling arbitrary data
Since everything sent over the wire is converted to `JSON` we can't send anything and get it returned the same. For example `Date` will lose it's structure once converted to `string`.

```ts file=server
middleware
  .call(() => new Date) 
```
To handle returning/sending any data we can use <a href="https://github.com/Rich-Harris/devalue" target="_blank">devalue</a>. 

## Devalue option
Fortunately `devalue` already takes care of `Date`, but here's how we can do it ourselves in a shared options file.
```ts file=kavi/options.ts
import { type Options, pipe } from 'kavi'

export const options = {
  devalue: {
    Date: pipe
      .onStringify((value) => {
        return value instanceof Date && date.toString()
      })
      .onParse((value) => new Date(value))
  }
}
```
To apply the options it has to be passed to both
```ts file=hooks.server.ts
createHandle(router, options)
```
and
```ts file=kavi/client.ts
createHandle<Router>(options)
```