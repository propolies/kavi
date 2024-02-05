import type { Router } from "./router"
import { createClientRouter, type ClientRouter } from "svelte-api"

export let r = createClientRouter<ClientRouter<Router>>()