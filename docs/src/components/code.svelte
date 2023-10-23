<script lang="ts">
  import "../app.css"
  import Copy from "./copy.svelte"
  import hljs from 'highlight.js/lib/core'
  import 'highlight.js/styles/github-dark.css'
  import typescript from 'highlight.js/lib/languages/typescript'
  import xml from 'highlight.js/lib/languages/xml'
  import bash from 'highlight.js/lib/languages/bash'
  import svelte from "$lib/svelte_hljs"
  hljs.registerLanguage('typescript', typescript)
  hljs.registerLanguage('xml', xml)
  hljs.registerLanguage('svelte', svelte)
  hljs.registerLanguage('bash', bash)

  export let code: string
  export let lang = "typescript"
  export let directory: string | undefined = undefined
  code = code.slice(1, -1)
</script>

<div class="relative {$$props.class}">
  <div class:hidden={!directory} class="bg-secondary/40 p-2 rounded-t text-dark">
    {directory}
  </div>
  <pre class:rounded={!directory} class="rounded-b px-4 py-2 pr-8 bg-secondary overflow-x-auto">{@html hljs.highlight(code, { language: lang }).value}</pre>
  <Copy text={code} />
</div>
