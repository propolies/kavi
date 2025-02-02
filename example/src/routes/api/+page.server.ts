import { api } from "$lib/kavi/client"
import { ctx } from "kavi/server"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
  console.log("[server load] got", await api.test("hi").expect())
  console.log("start", ctx.event.cookies.get("theCookie"))
  await new Promise((r) =>
    setTimeout(() => {
      console.log("end  ", ctx.event.cookies.get("theCookie"))
      r(1)
    }, 2000),
  )
}
