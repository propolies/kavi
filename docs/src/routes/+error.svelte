<script lang="ts">
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { sections } from '$lib/sections'

  onMount(() => {
    const [section, subsections] = sections[0]
  // goto(`/docs/${section}/${subsections[0]}`)
  })
</script>

error man