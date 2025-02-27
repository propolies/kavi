<script lang="ts">
  import { api } from "$lib/kavi/client"
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button
  onclick={async () => {
    await api.hello().ok()
  }}
>
  Set cookie
</button>
