<script lang="ts">
  import { vault } from "$lib/vault.svelte"
  import { fade, fly } from "svelte/transition"
  import Sections from "./sections.svelte"
  import { clickOutside } from "svelte-outside"

  const duration = 150
</script>

{#if vault.showVault}
  <div
    out:fade={{ duration }}
    in:fade={{ duration }}
    class="fixed w-full h-screen z-30 bg-black/60 backdrop-blur-sm"
  ></div>
  <div
    in:fly={{ y: window.innerHeight, opacity: 0.8, duration }}
    out:fly={{ y: window.innerHeight, opacity: 0.8, duration }}
    use:clickOutside={() => (vault.showVault = false)}
    class="fixed w-full h-[80%] bottom-14 z-30 body-overflow-hidden bg-zinc-900 pt-6 rounded-t-2xl overflow-hidden"
  >
    <div class="w-full px-6 pb-12 overflow-y-auto h-full flex flex-col gap-4">
      <Sections onselect={() => (vault.showVault = false)} />
    </div>
  </div>
{/if}
