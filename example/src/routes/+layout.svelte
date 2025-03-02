<script>
  import "../app.css"
</script>

<main class="relative bg-gray-900 min-h-dvh">
  <div class="absolute inset-0 bg-gradient-to-b from-blue-500 to-gray-900 opacity-35"></div>
  <div class="absolute inset-0 dots opacity-10"></div>
  <slot />
</main>

<style>
  .dots {
    background-image: radial-gradient(#fff 1px, transparent 1px);
    background-size: 20px 20px;
  }
</style>
