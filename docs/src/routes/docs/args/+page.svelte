<script lang="ts">
  import Code from "$lib/components/code.svelte";
</script>

<h1>
  Args
</h1>
<p>
  Notice how we are not only getting access to the arguments, but also still have access to the context.
</p>
<Code directory="router.ts" code={`
export const router = {
  one: context
    .args(z.number())
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