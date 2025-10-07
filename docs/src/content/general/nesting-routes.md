Routes can be nested as much as you want.

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
