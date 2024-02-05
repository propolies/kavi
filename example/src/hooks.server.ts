import { createHandle } from 'svelte-api'
import { router } from './lib/sapi/router'

export const handle = createHandle(router)