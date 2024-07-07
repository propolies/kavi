<script lang="ts">
  import Navbar from '$lib/components/navbar.svelte'
  import Vault from '$lib/components/vault.svelte'
  import '../app.css'
</script>

<Vault />
<div
  class="flex justify-center"
>
  <div
    class="flex flex-col w-full items-center"
  >
    <Navbar />
    <slot />
  </div>
</div>