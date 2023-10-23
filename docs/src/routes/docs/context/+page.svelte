<script lang="ts">
  import Code from "$lib/components/code.svelte";
</script>

<h1>
  Context <a href="/docs/context-example">example</a>
</h1>
<p>
  Notice how the built-in <code>context</code> middleware has access to the <code>event</code>. This can be reused to create custom middleware/context for a call.
</p>
<Code directory="router.ts" code={`
import { context } from '@svelte-api/core'

const every = context.use(ctx => {
  return {
    cookies: ctx.event.cookies
  }
})
// ...
`} />
<p>
  You will now have access to the <code>cookies</code> object in all calls using the <code>every</code> context. <code>every</code> will also inherit all the previous context, which in this case includes <code>event</code>.
</p>
<Code class="mb-0" directory="router.ts" code={`
// ...
export const router = {
  setCookie: every
    .call(ctx => {
      ctx.cookies.set("name", "value")
    })
}
`} />

<h1>
  Chaining
</h1>
<p>
  Chaining makes it easy to run multiple middlewares.
</p>
<Code directory="router.ts" code={`
import { context } from '@svelte-api/core'

const first = context.use(() => {
  console.log("running first")
  return {}
})

const second = context.use(ctx => {
  console.log("running second")
  return {}
})

const third = context.use(ctx => {
  console.log("running third")
  return {}
})

export const router = {
  test: first
    .chain(second)
    .chain(third)
    .call(() => {
      // call third
    })
}
`} />