import { api } from '$lib/kavi/client'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
  console.log("[server load] got", await api.with(event).test("hi").expect())
}