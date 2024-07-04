<script>
  import Sidebar from "$lib/components/sidebar.svelte"
  import Toc from "$lib/components/toc.svelte"
</script>

<main
  class="
    max-w-4xl
    grid gap-4 min-h-screen w-full justify-center
    grid-cols-1
    sm:grid-cols-[12rem,1fr]
    min-[900px]:grid-cols-[12rem,1fr,8rem]
  "
>
  <div class="sm:block hidden">
    <Sidebar />
  </div>
  <slot />
  <div class="w-full">
    <Toc />
  </div>
</main>