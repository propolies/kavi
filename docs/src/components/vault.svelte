<script lang="ts">
  import { vault } from "$lib/vault.svelte"
  import { fade, fly } from "svelte/transition"
  import Sections from "./sections.svelte"

  const duration = 150
</script>

{#if vault.showVault}
  <button
    out:fade={{ duration }}
    in:fade={{ duration }}
    onclick={() => vault.showVault = false}
    class="fixed w-full h-screen z-30 bg-black/60 backdrop-blur-sm"
  >
  </button>
  <div
    in:fly={{ y: window.innerHeight, opacity: .8, duration }}
    out:fly={{ y: window.innerHeight, opacity: .8, duration }}
    class="fixed w-full h-[80%] bottom-14 z-30 body-overflow-hidden bg-zinc-900 pt-6 rounded-t-2xl overflow-hidden"
  >
    <div class="w-full px-6 pb-12 overflow-y-auto h-full flex flex-col gap-4">
      <Sections onselect={(() => vault.showVault = false)} />
    </div>
  </div>
{/if}