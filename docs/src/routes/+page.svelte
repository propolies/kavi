<script>
  import Code from "$lib/components/code.svelte"
  const code = `
npm install svelte-api
`;
</script>

<div class="flex flex-col justify-center gap-32 mt-8 p-4">
  <h1 class="text-white text-5xl font-medium text-center">
    Simple end-to-end <br> typesafety for SvelteKit
  </h1>
  <div class="flex sm:flex-row flex-col items-center justify-center gap-2">
    <Code lang="bash" {code} />
    <a href="/docs/setup" class="bg-accent rounded-sm p-2 w-fit">
      Documentation
    </a>
  </div>
</div>
