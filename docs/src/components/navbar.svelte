<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Github, Menu } from '@steeze-ui/lucide-icons'
  import { showSidebar } from '$lib/stores'
  import Logo from "$lib/components/svg/logo.svelte";
  import { page } from '$app/stores'

  $: isDocs = $page.url.pathname.startsWith("/docs")
  let innerWidth: number
</script>
<svelte:window bind:innerWidth />
<nav class:hidden={isDocs && (!innerWidth || innerWidth >= 1024)} class="flex {isDocs ? "justify-center" : "justify-start"} py-4 mx-4 sticky top-0 z-40 bg-primary ">
  <a href="/" class="flex items-center gap-2">
    <Logo class="" />
    <p class="text-2xl font-bold">SAPI</p>
  </a>
  <div class="absolute right-0 top-0 h-full flex items-center gap-4">
    <a href="/docs/setup" class="text-dark hover:text-white transition-all">
      Docs
    </a>
    <a target="_blank" href="https://github.com/propolies/svelte-api">
      <Icon src={Github} class="text-dark w-6 h-6 hover:text-white transition-all" />
    </a>
  </div>
  <button id="ignored" on:click={() => $showSidebar = true} class:hidden={!isDocs}>
    <Icon src={Menu} class="w-6 absolute left-0 top-0 text-light hover:text-white transition-all" />
  </button>
</nav>


