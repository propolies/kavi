import type { Router } from "./router"
import { createClientRouter, type ToPromise, type Pretty } from "svelte-api"

export let r = createClientRouter<Pretty<ToPromise<Router>>>()