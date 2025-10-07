<script lang="ts">
  import { api } from "$lib/kavi/client"

  async function add() {
    return 1 + 2
  }

  const added = await add()
  console.log(added)
</script>

<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
