<script lang="ts">
  import Code from "$lib/components/code.svelte";
</script>

<h1>
  Params
</h1>
<p>
  Notice how we are not only getting access to the params, but also still have access to the context.
</p>
<Code directory="router.ts" code={`
export const router = {
  one: context
    .params<number>()
    .call((n, ctx) => {
      return n
    })
}
`} />

<p>
  Simply called just like any other function.
</p>
<Code code={`
await r.one(1)
`} />