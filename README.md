# kavi

[![npm version](https://flat.badgen.net/npm/v/kavi?color=orange)](https://npmjs.com/package/kavi)

The easiest way to achieve typesafe apis in svelte

## Install
```
pnpm add kavi zod
```

## Usage
Simply define a function
```ts
// server
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
And voila, a typesafe api
```ts
// client
await api.add([1, 2]).ok() // 3
```
Read more in the [docs](https://propolies.github.io/kavi/docs/getting-started/introduction)
