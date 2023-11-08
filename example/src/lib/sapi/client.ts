import type { Router } from "$lib/sapi/router"
import { createClientRouter, type ToPromise, type Pretty } from "@svelte-api/core"

export let r = createClientRouter<Pretty<ToPromise<Router>>>()