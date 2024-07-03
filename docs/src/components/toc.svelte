<script lang="ts">
  import { untrack } from 'svelte'
  import { page } from '$app/stores'
  import { capitalize } from '$lib/utils'
  import { base } from '$app/paths'

  function normalize(str: string) {
    return capitalize(str.replaceAll("-", " "))
  }

  let path = $derived(`${base}/docs/${$page.params.slug}`)
  const toc: [string, string[]][] = $state([])

  $effect(() => { path; untrack(() => {
    toc.length = 0
    const headings = document.querySelectorAll(`
    article > h2,
    article > h3
    `)
    let headerCount = -1
    headings.forEach(({ id, tagName }) => {
      if (tagName == "H2") {
        headerCount++
        toc[headerCount] = [id, []]
        return
      }
      toc[headerCount][1].push(id)
    })
  })})
</script>

<nav id="toc" class="text-gray-200 opacity-90 fixed h-[calc(100vh-theme(size.14))] flex-col stable hidden min-[900px]:flex py-8">
  <a href="{path}" class="text-gray-400 mb-2">
    On this page
  </a>
  {#each toc as [h2, h3s]}
    <a href="{path}#{h2}" class="text-sm my-1">
      {normalize(h2)}
    </a>
    <div class="flex flex-col ml-3 text-sm">
      {#each h3s as h3}
        <a href="{path}#{h3}" class="p-[1px]">
          {normalize(h3)}
        </a>
      {/each}
    </div>
  {/each}
</nav>

<style>
  a {
    @apply hover:underline;
  }
</style>
