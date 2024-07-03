<script context="module">
  export { default as pre } from "./pre.svelte"
</script>

<script lang="ts">
  export let metadata
</script>

<slot {metadata} />
