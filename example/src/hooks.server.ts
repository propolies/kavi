import { createHandle } from '@svelte-api/core'
import { router } from '$lib/sapi/router'

export const handle = createHandle(router)