<script lang="ts">
  import { page } from "$app/stores"
  import { sections } from "$lib/sections"
  import { CamelCase } from "$lib/utils"
  import Link from "./link.svelte"

  let { onselect }: {
    onselect?: () => void
  } = $props()
</script>

{#each sections as [section, subsections]}
  <section>
    <h1 class="text-zinc-600 text-nowrap text-xl font-semibold">
      {CamelCase(section)}
    </h1>
    <div class="flex flex-col">
      {#each subsections as subsection}
        {@const path = `${section}/${subsection}`}
        {@const isActive = $page.params.slug == path}
        <Link
          onclick={onselect}
          href="/docs/{path}"
          class="hover:underline transition-all duration-100 py-1 {isActive
            ? "text-gray-50 font-bold"
            : "text-zinc-300 opacity-90"
          }">
          {CamelCase(subsection)}
        </Link>
      {/each}
    </div>
  </section>
{/each}