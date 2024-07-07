<script lang="ts">
  import { Icon } from "@steeze-ui/svelte-icon"
  import { Book } from "@steeze-ui/lucide-icons"
  import Github from "$lib/components/svg/github.svelte"
  import Link from "$lib/components/link.svelte"
</script>

<div class="text-white flex flex-col items-center mt-24 p-6">
  <div class="text-3xl font-bold text-center max-w-lg">
    <span>Achieve</span>
    <span class="text-4xl font-black text-[#348DF2]">
      TYPESAFE APIs
    </span>
    <span>with ease in</span>
    <span class="text-[#FF3E00]">
      SvelteKit<span class="text-white">.</span>
    </span>
  </div>
  <div class="flex min-[400px]:flex-row flex-col gap-4 mt-12">
    <Link
      href="/docs/getting-started/introduction"
      class="flex bg-[#348DF2] text-[#001B39] p-2 rounded-sm gap-2"
    >
      <Icon src={Book} class="w-6 stroke-[2.5]" />
      <p class="font-bold">Documentation</p>
    </Link>
    <a
      href="https://github.com/propolies/kavi"
      class="flex gap-2 p-2 hover:border-white border border-zinc-900 rounded-sm transition-all"
    >
      <Github class="size-6" />
      <p>View on Github</p>
    </a>
  </div>
</div>