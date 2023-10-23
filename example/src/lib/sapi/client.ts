import type { Client } from '@svelte-api/core'
import type { Router } from './router'

export let r: Client<Router>
export async function initClientRouter(getClient: () => Promise<Client<Router>>) {
  r = await getClient()
}