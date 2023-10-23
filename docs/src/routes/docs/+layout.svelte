<script lang="ts">
  import Logo from "$lib/components/svg/logo.svelte";
  import Drop from "$lib/components/drop.svelte";
  import Doc from "./doc.svelte";
</script>

<main class="flex gap-4 h-full">
  <!-- Sidebar -->
  <div class="hidden lg:flex flex-col items-center gap-4 h-screen p-4 w-[450px] overflow-y-auto stable">
    <a href="/" class="flex items-center gap-2">
      <Logo class="" />
      <p class="text-2xl font-bold">SAPI</p>
    </a>
    <div class="grid grid-cols-[auto, 1fr] grid-rows-[auto, 1fr] gap-4">
      <div class="bg-white w-4 h-1 rounded place-self-center" />
      <h1 class="font-bold text-xl col-start-2">
        Documentation
      </h1>
      <Drop class="col-start-2" />
    </div>
  </div>
  <div class="hidden lg:block bg-secondary w-0.5 h-screen" />
  <!-- Docs -->
  <Doc>
    <slot />
  </Doc>
</main>
