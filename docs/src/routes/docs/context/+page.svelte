<script lang="ts">
  import Code from "$lib/components/code.svelte";
</script>

<h1>Context</h1>
<p>
  Notice how the built-in <code>context</code> middleware has access to <code>event</code> and <code>cookies</code>. This can be reused to create custom middleware/context for a call.
</p>
<Code directory="router.ts" code={`
import { context } from 'svelte-api'

const user = context.use(({ cookies }) => {
  return {
    jwt: cookies.get("jwt")
  }
})
// ...
`} />
<p>
  You will now have access to the <code>jwt</code> in all calls using the <code>user</code> context. <code>user</code> will also inherit all the previous context, which in this case includes <code>event</code> and <code>cookies</code>.
</p>
<Code class="mb-0" directory="router.ts" code={`
// ...
export const router = {
  getUser: user
    .call(({ jwt })) => {
      // Auth with jwt
    })
}
`} />