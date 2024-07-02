<script lang="ts">
  import { sections } from '$lib/sections'
  import { page } from "$app/stores"
  import { CamelCase } from '$lib/utils'
  import { base } from '$app/paths'
</script>

<nav class="px-6 py-8 flex-col gap-12 h-screen sticky top-0 stable sm:flex hidden min-w-fit overflow-y-auto">
  {#each sections as [section, subsections]}
    <section>
      <h1 class="text-zinc-600 text-nowrap text-xl font-semibold">
        {CamelCase(section)}
      </h1>
      <div class="flex flex-col">
        {#each subsections as subsection}
          {@const path = `${section}/${subsection}`}
          {@const isActive = $page.params.slug == path}
          <a 
            href="{base}/docs/{path}"
            class="hover:underline transition-all duration-100 py-1 {isActive
              ? "text-gray-50 font-bold"
              : "text-zinc-300 opacity-90"
            }">
            {CamelCase(subsection)}
          </a>
        {/each}
      </div>
    </section>
  {/each}
</nav>