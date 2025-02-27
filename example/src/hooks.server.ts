import { createHandle } from "kavi/server"
import { router } from "$lib/kavi/server"
import { options } from "$lib/kavi/options"

export const handle = createHandle(router, options)
