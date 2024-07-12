---
description: How to handle errors
---

## Handling errors
Any errors received on the client will be the class `AnyError` from Kavi, here's how to handle them

```ts file=client
await api.danger().error((e) => {
  // The error is what was thrown
  e.error 
})
```