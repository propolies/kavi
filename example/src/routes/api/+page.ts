import type { PageLoad } from './$types'
import { api } from '$lib/kavi/client'

export const load: PageLoad = async (event) => {
  console.log("[load  ] got", await api.with(event).ping().ok())
}