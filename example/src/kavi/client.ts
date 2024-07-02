import type { Api } from "./server"
import { createApiClient } from "kavi/client"
import { options } from "./options"

export const api = createApiClient<Api>(options)