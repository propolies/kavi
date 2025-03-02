<script lang="ts">
  import { Icon } from "@magicons/core"
  import { api } from "$lib/kavi/client.js"

  let { data } = $props()
</script>

<div class="pt-8 relative flex text-white justify-center pb-32">
  <div class="flex flex-col gap-6">
    <a
      href="/"
      class="flex bg-white rounded p-2 items-center justify-between gap-4 w-fit text-black">
      <Icon src="@lucide-ChevronLeft" />
      <p class="mr-6">Back</p>
    </a>
    <h1 class="font-bold text-4xl">API Examples</h1>
    <div class="flex flex-col gap-12">
      <div class="flex flex-col">
        <p class="text-lg w-lg">
          First of all we will look at a generic endpoint for dividing two numbers and how to handle
          the case of division by zero.
        </p>
      </div>
      <div class="flex flex-col gap-4">
        {@html data.example1.server}
        {@html data.example1.client}
        <div>
          <button onclick={async () => console.log(await api.divide([6, 2]).ok())}>
            {@html data.example1.snippet_a}
          </button>
          <button onclick={async () => console.log(await api.divide([6, 0]).ok())}>
            {@html data.example1.snippet_b}
          </button>
        </div>
      </div>
      <div>
        <button
          onclick={async () => console.log(await api.setCookie().expect())}
          class="rounded p-2 bg-gray-900 border border-white/10">Set Cookie</button>
        <button
          onclick={async () => console.log(await api.getCookie().expect())}
          class="rounded p-2 bg-gray-900 border border-white/10">Get Cookie</button>
        <button
          onclick={async () => console.log(await api.deleteCookie().expect())}
          class="rounded p-2 bg-gray-900 border border-white/10">Delete Cookie</button>
      </div>
      <div></div>
    </div>
  </div>
</div>

<style>
  @reference "tailwindcss";

  :global(pre) {
    @apply rounded p-2 !bg-gray-900 border border-white/10;
  }
</style>
