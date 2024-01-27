import { createHandle } from 'svelte-api'
import { router } from './sapi/router'

export const handle = createHandle(router)