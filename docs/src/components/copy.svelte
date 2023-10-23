<script lang="ts">
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Copy } from "@steeze-ui/lucide-icons";
  import Check from "$lib/components/svg/check.svelte";
  import { fly } from "svelte/transition";

  export let text: string
  let copied = false
  const copy = async (text: string) => {
      await navigator.clipboard.writeText(text);
      copied = true
      setTimeout(() => {
        copied = false
      }, 1000)
  }
</script>

<div class="absolute top-0 right-0 mt-3 mr-2 text-white w-4 overflow-hidden">
  {#if copied}
    <button class="text-start w-fit opacity-40">
      <Check />
    </button>
  {:else}
    <button on:click={async () => await copy(text)}
      in:fly={{ x: 10 }}
      class="transition-all opacity-40 hover:opacity-100"
    >
      <Icon src={Copy} />
    </button>
  {/if}
</div>
