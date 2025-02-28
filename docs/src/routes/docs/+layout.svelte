<script>
  import Navbar from "$lib/components/navbar.svelte"
  import Vault from "$lib/components/vault.svelte"
  import Sidebar from "$lib/components/sidebar.svelte"
  import Toc from "$lib/components/toc.svelte"
</script>

<Vault />
<div class="flex flex-col max-h-dvh stable overflow-y-auto">
  <div class="flex justify-center w-fullh h-full">
    <div class="flex flex-col w-full items-center">
      <Navbar />
      <main
        class="
      max-w-4xl
      grid gap-4 min-h-[calc(100dvh - theme(size.14))] w-full
      grid-cols-1
      sm:justify-items-start justify-items-center
      sm:grid-cols-[12rem_1fr] sm:px-6
      min-[56.25rem]:grid-cols-[12rem_1fr_8rem]
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
    </div>
  </div>
</div>
