<script lang="ts">
  import Navigation from "./navigation.svelte"
  import { page } from "$app/state"
  import { capitalize } from "$lib/utils"

  let { data } = $props()
  let Component = $derived(data.component)

  const titleId = $derived(page.params.slug.split("/")[1])
  const title = $derived(capitalize(titleId.replaceAll("-", " ")))
</script>

<article class="prose overflow-hidden prose-invert w-full m-8 pb-8 px-6 mx-0">
  <h1 class="mb-0" id={titleId}>
    {title}
  </h1>
  <p class="text-lg opacity-90 m-0 pt-4 flex">
    {data.metadata.description}
  </p>
  <hr />

  <Component />
  <hr style="margin-bottom: .8rem;" />
  <Navigation />
</article>

<style>
  @reference "tailwindcss";

  .prose {
    hr {
      @apply my-8;
    }
  }

  :global(h1, h2, h3, h4) {
    scroll-margin-top: 5rem;
  }
</style>
