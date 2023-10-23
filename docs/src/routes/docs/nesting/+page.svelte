<script>
  import Code from "$lib/components/code.svelte";
</script>

<h1>
  Nesting
</h1>
<p>
  To organize api calls, you can use nesting just like normal objects.
</p>
<Code directory="router.ts" code={`
export const router = {
  user: {
    get: context.call(() => {}),
    delete: context.call(() => {}),
  }
}
`} />

<p>
  Intuitively it's called just the same way.
</p>
<Code code={`
await r.user.get() 
await r.user.delete() 
`} />