declare module "*.svelte" {
  import type { ComponentType } from "svelte"
  const component: ComponentType
  export default component
}

declare module "*.md" {
  import type { ComponentType } from "svelte"
  const component: ComponentType
  export default component
}
