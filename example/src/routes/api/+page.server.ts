import { api } from '$lib/kavi/client'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  console.log("[server load] got", await api.test().ok())
}