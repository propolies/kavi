---
description: Nesting is an optional feature for organizing the API.
---

Not really a recommended approach as it can be hard to maintain. But if you wish you can nest the API as deep as needed.
```ts file=server.ts
export const router = {
  user: {
    get: ...,
    delte: ...,
    update: ...,
  }
}
```
```ts file=client
await api.user.get().ok()
```