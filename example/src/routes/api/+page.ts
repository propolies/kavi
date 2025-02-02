import { api } from "$lib/kavi/client"
import { browser } from "$app/environment"

export const load = async (event) => {
  console.log("[load  ] got", await api.ping().ok())
}
