<script lang="ts">
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import { sections } from '$lib/sections.js'
  import { CamelCase } from '$lib/utils'
  const [section, subsection] = $derived($page.params.slug.split("/"))

  function navigate(sign: 1 | -1): [string, string] | undefined {
    const sectionIndex = sections.findIndex(([sect]) => sect == section)
    const subsections = sections[sectionIndex][1]
    const subsectionIndex = subsections.indexOf(subsection)

    const nextSubsection = subsections[subsectionIndex + sign]
    if (nextSubsection) return [sections[sectionIndex][0], nextSubsection]
    const nextSection = sections[sectionIndex + sign]
    if (nextSection) {
      const fallback = nextSection[1].at(sign == 1 ? 0 : -1)
      if (fallback) {
        return [nextSection[0], fallback]
      }
    }
  }
</script>

{#snippet Navigate(direction: "Next" | "Prev")}
  {@const isNext = direction === "Next"}
  {@const sign = isNext ? 1 : -1}
  {@const navigation = navigate(sign)}
  {#if navigation}
    <a
      href="{base}/docs/{navigation.join("/")}"
      class="w-full hover:text-white group
        {isNext
          ? "col-start-2 place-self-end"
          : "col-start-1"
        }"
    >
      <div class:text-right={isNext}>
        <p class="text-gray-400">
          {direction}
        </p>
        <p class="group-hover:underline">
          {CamelCase(navigation[1])}
        </p>
      </div>
    </a>
  {/if}
{/snippet}

<nav class="not-prose grid grid-cols-2 justify-between">
  {@render Navigate("Prev")}
  {@render Navigate("Next")}
</nav>