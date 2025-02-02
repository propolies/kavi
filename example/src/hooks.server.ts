import { createHandle } from "kavi/server"
import { apiRouter } from "./kavi/server"
import { options } from "./kavi/options"

export const handle = createHandle(apiRouter, options)
