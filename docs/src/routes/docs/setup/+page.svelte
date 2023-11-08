<script lang="ts">
  import Code from "$lib/components/code.svelte"
</script>

<h1>
  Setup
</h1>
<p>
  This is the structure needed.
</p>
<Code lang="bash" code= {`
src/
  hooks.server.ts 
  lib/
    /sapi/
      client.ts 
      router.ts 
`} />
<Code directory="router.ts" code={`
export const router = { 
  // Add api routes here
}
export type Router = typeof router
`} />

<Code directory="client.ts" code={`
import type { Router } from "$lib/sapi/router"
import { createClientRouter, type ToPromise, type Pretty } from "@svelte-api/core"

export let r = createClientRouter<Pretty<ToPromise<Router>>>()
`} />

<Code directory="hooks.server.ts" code={`
import { createHandle } from '@svelte-api/core'
import { router } from '$lib/sapi/router'

export const handle = createHandle(router)
`} />