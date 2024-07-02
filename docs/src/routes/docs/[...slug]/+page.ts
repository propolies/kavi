import type { PageLoad } from "./$types.js"
import { modules } from "../../../modules.js"

export const prerender = true

export const load: PageLoad = async ({ params: { slug } }) => {
  const path = `/src/content/${slug}.md`
  const { [path]: resolve } = modules
  // if (!resolve) throw error(404)
  const { default: component, metadata } = await resolve()
  return {
    component,
    metadata
  }
}
