<script lang="ts">
  import Code from "$lib/components/code.svelte";
</script>

<h1>
  Call
</h1>
<p>
  To make server calls we need to use the default <code>context</code> object, which we will get more into in the <a href="/docs/context">context</a> section.
</p>
<Code directory="router.ts" code={`
import { context } from '@svelte-api/core'

export const router = {
  hi: context
    .call(() => {
      // This happens on the server
      console.log("hi server")
    })
}
`} />
<p>
  Heres an example on how it can be used.
</p>
<Code lang="svelte" directory="+page.svelte" code={`
<script>
  import { r } from '$lib/sapi/client'
<\/script>

<button on:click={async () => await r.hi()} />
`} />

<h1>Returning a value</h1>
<Code directory="router.ts" code={`
import { context } from '@svelte-api/core'

export const router = {
  one: context
    .call(() => {
      return 1
    })
}
`} />
<p>
  Just like a regular function you can simply assign to it.
</p>
<Code code={`
const res = await r.one()
     //^typeof res = ReturnType<typeof r.one>
     //            = number
`} />
