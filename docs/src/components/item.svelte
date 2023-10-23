<script lang="ts">
  import { goto } from "$app/navigation";
  import { showSidebar } from "$lib/stores";
  import { page } from '$app/stores'
  import type { Section } from '$lib/types'

  export let name: Section

  const path = `/docs/${name.toLowerCase()}`
</script>

<button
  class="w-full text-start hover:bg-black rounded px-2 py-1
  {$page.url.pathname === path && "text-accent"}"
  on:click={() => { 
    $showSidebar = false
    goto(path)
  }}
>
  {name}
</button>