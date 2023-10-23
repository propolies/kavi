<script>
  import { Icon } from '@steeze-ui/svelte-icon';
  import { X } from '@steeze-ui/lucide-icons';
  import { showSidebar } from "$lib/stores";
  import { fly, fade } from "svelte/transition";
  import Drop from './drop.svelte';
  import { clickOutside } from '$lib/utils/outisde';
  const options = { x: -100, duration: 100 };
</script>

{#if $showSidebar}
  <div in:fade={{ duration: 50 }} out:fade={{ duration: 50 }} class="lg:hidden absolute z-50 bg-black/60 left-0 top-0 w-full h-full" />
  <div use:clickOutside={() => $showSidebar = false} in:fly={options} out:fly={options} class="lg:hidden absolute z-50 flex flex-col items-center bg-primary p-4 left-0 top-0 h-full shadow-2xl overflow-y-auto">
    <div class="flex items-center justify-between w-full mb-4">
      <h1 class="text-xl font-medium select-none">Documentation</h1>
      <button on:click={() => $showSidebar = false}>
        <Icon src={X} class="w-5 text-dark" />
      </button>
    </div>
    <Drop />
  </div>
{/if}