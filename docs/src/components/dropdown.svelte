<script lang="ts">
  import { Icon } from "@steeze-ui/svelte-icon";
  import { ChevronRight } from "@steeze-ui/lucide-icons";
  import Item from "./item.svelte";
  import type { Sub, Section } from '$lib/types'
  import { page } from "$app/stores";

  export let onClick = () => {}
  export let name: Sub
  export let items: Section[]

  $: isSelected = items.find(item => item.toLowerCase() == $page.url.pathname.split("/")[2])
</script>

<div class="flex flex-col w-full">
  <button on:click={() => {onClick()}}
    class="flex items-center justify-between w-full transition-all rounded p-2 
    {isSelected ? "bg-accent" : "bg-secondary"}"  
  >
    <p>{name}</p>
    <Icon src={ChevronRight} class="w-4 transition-all {isSelected && "rotate-90"}" />
  </button>

  <!-- Hack transition auto -->
  <div class="transition-all grid 
    {isSelected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}"
  >
    <div class="overflow-hidden ml-4 [&>*]:my-1">
      {#each items as item}
        <Item name={item} />
      {/each}
    </div>
  </div>
</div>


  