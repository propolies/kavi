<script lang="ts">
  import { base } from '$app/paths'
  import type { Snippet } from 'svelte'
  import type { HTMLAnchorAttributes } from 'svelte/elements'

  let {
    href,
    ...rest
  }: HTMLAnchorAttributes & {
    href: string,
    children: Snippet
  } = $props()
</script>

<a href="{base}{href}" {...rest}>
  {@render rest.children()}
</a>