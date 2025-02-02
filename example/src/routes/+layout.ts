import { browser } from "$app/environment"
import { initClientEvent } from "kavi/client"

export const load = (event) => {
  initClientEvent(event)
}
