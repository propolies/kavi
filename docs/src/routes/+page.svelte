<script lang="ts">
  import Link from "$lib/components/link.svelte"
  import { Icon, type Icons } from "@magicons/core"

  const cards: {
    icon: Icons
    title: string
    description: string
  }[] = [
    {
      icon: "@lucide-ShieldCheck",
      title: "Type Safe",
      description: "Achieve end to end Type Safety everywhere",
    },
    {
      icon: "@lucide-RefreshCcw",
      title: "SSR and CSR",
      description: "Seamless integration with +page.ts and +server.ts files",
    },
    {
      icon: "@lucide-Box",
      title: "Tiny package",
      description: "Incredibly small package size of less than 30kB",
    },
  ]
</script>

<div class="relative flex justify-center items-center min-h-dvh overflow-x-hidden overflow-y-auto">
  <div class="absolute inset-0 size-full z-0">
    <div
      class="absolute pulse top-0 -left-1/4 size-1/2 bg-purple-700 rounded-full opacity-20 blur-3xl"
    ></div>
    <div
      class="absolute pulse bottom-0 -right-1/4 size-1/2 bg-indigo-600 rounded-full opacity-20 blur-3xl"
    ></div>
    <div
      class="absolute pulse top-1/3 right-1/4 w-1/3 h-1/3 bg-pink-600/60 rounded-full opacity-20 blur-3xl"
    ></div>
  </div>
  <div class="flex flex-col items-center gap-4 z-10">
    <h1 class="text-5xl text-white font-bold lg:mt-0 mt-60">Kavi</h1>
    <p class="text-xl text-gray-300 w-96 text-center">
      A lightweight library for SvelteKit to quickly create end to end typesafe applications
    </p>
    <div class="flex items-center gap-4">
      <a
        href="https://github.com/propolies/kavi"
        class="flex py-3 px-8 text-white rounded-md gap-2 bg-gray-800/30 hover:bg-gray-700/40 border border-gray-700/50 hover:border-gray-500 transition-all shadow-xl"
      >
        <Icon src="@lucide-Github" class="stroke-2" />
        <p>GitHub</p>
      </a>
      <Link
        href="/docs/getting-started/introduction"
        class="flex items-center justify-center py-3 px-8 gap-2 text-white bg-gradient-to-r from-purple-600/80 to-indigo-600/80 border border-white/20 rounded-md shadow-xl bg-origin-border"
      >
        <Icon src="@lucide-Book" class="size-5" />
        <p>Documentation</p>
      </Link>
    </div>
    <div class="flex flex-col lg:flex-row gap-6 items-center justify-center my-12 p-6">
      {#each cards as { icon, title, description }}
        <div
          class="flex flex-col items-center gap-6 p-6 rounded bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 border border-white/5 backdrop-blur-xl lg:w-64 w-full bg-white/[0.025] shadow-lg"
        >
          <div
            class="p-3 rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-purple-300 size-12"
          >
            <Icon src={icon} />
          </div>
          <div class="flex flex-col gap-2 items-center">
            <h3 class="text-white text-xl font-semibold">{title}</h3>
            <p class="text-gray-300 text-center">{description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  @keyframes pulse {
    0% {
      opacity: 0.15;
    }
    50% {
      opacity: 0.25;
    }
    100% {
      opacity: 0.15;
    }
  }

  .blur-3xl {
    animation: pulse 8s infinite ease-in-out;
  }

  .blur-3xl:nth-child(2) {
    animation-delay: -2s;
  }

  .blur-3xl:nth-child(3) {
    animation-delay: -4s;
  }
</style>
