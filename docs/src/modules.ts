import type { ComponentType } from "svelte"

type Modules = Record<string, () => Promise<{
  default: ComponentType,
  metadata: {
    title: string,
    description: string
  }
}>>

export const modules = import.meta.glob("/src/content/**/*md") as Modules
