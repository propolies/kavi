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
  hooks.client.ts 
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
import { createClientRouter, type Client } from '@svelte-api/core'
import type { Router } from './router'

export let r: Client<Router>
export async function initClientRouter(getClient: () => Promise<Client<Router>>) {
  r = await getClient()
}
`} />

<Code directory="hooks.server.ts" code={`
import { createHandle } from '@svelte-api/core'
import { router } from '$lib/sapi/router'

export const handle = createHandle(router)
`} />

<Code directory="hooks.client.ts" code={`
import { createClientRouter } from '@svelte-api/core'
import { initClientRouter } from '$lib/sapi/client'

initClientRouter(createClientRouter)
`} />
