# kavi

[![npm version](https://flat.badgen.net/npm/v/kavi?color=orange)](https://npmjs.com/package/kavi)

The easiest way to achieve typesafe APIs in SvelteKit. This is meant to be an easy, simple and lightweight alternative to **tRPC-SvelteKit**. Kavi handles both `+page.server.ts`, `+page.ts` and `+page.svelte` files seamlessly.

## Install
```
npm i kavi zod
```

## Usage
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
```ts
// client
await api.add([1, 2]).ok() // 3
```
Read more in the [docs](https://propolies.github.io/kavi/docs/getting-started/introduction)