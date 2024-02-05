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
import { context } from "svelte-api"
import z from 'zod'

export const router = { 
  // Add api routes here
}
export type Router = typeof router
`} />

<Code directory="client.ts" code={`
import type { Router } from "./router"
import { createClientRouter, type ClientRouter } from "svelte-api"

export let r = createClientRouter<ClientRouter<Router>>()
`} />

<Code directory="hooks.server.ts" code={`
import { createHandle } from 'svelte-api'
import { router } from '$lib/sapi/router'

export const handle = createHandle(router)
`} />