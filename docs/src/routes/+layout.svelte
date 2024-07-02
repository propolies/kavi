<script lang="ts">
  import '../app.css'
  import Sidebar from '$lib/components/sidebar.svelte'
  import Toc from '$lib/components/toc.svelte'
</script>

<div class="flex justify-center">
  <main class="flex min-h-screen w-full max-w-6xl justify-center sm:justify-normal">
    <Sidebar />
    <slot />
    <Toc />
  </main>
</div>