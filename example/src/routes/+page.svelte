<script lang="ts">
  import { Icon, type Icons } from "@magicons/core"

  const cards: {
    title: string
    description: string
    icon: Icons
    href: string
  }[] = [
    {
      title: "Apis",
      description: "Api examples on both client and server side. As well as handling of errors.",
      icon: "@lucide-Network",
      href: "/api",
    },
    {
      title: "Forms",
      description: "Form examples for creating forms easily from backend apis.",
      icon: "@lucide-FileText",
      href: "/form",
    },
    {
      title: "Websockets",
      description:
        "Websocket example for easily making end to end typesafe websockets and easily integrate and use apis.",
      icon: "@lucide-Radio",
      href: "/websocket",
    },
  ]
</script>

<div class="relative flex flex-col items-center justify-center">
  <h1 class="font-bold text-4xl mt-28 mb-14 text-white">Kavi Examples</h1>
  <div class="flex xl:flex-row flex-col gap-4">
    {#each cards as { title, description, icon, href }}
      <div class="rounded-lg border border-white/5 bg-white/[0.025] shadow-lg p-2 w-96">
        <div class="flex flex-col justify-between p-6 bg-white rounded-sm h-full">
          <div>
            <div class="flex gap-2 items-center">
              <Icon src={icon} class="" />
              <h1 class="font-semibold text-xl">{title}</h1>
            </div>
            <p class="mb-6 mt-2">{description}</p>
          </div>
          <a
            {href}
            class="rounded bg-gray-900 p-2 text-white z-50 active:scale-95 transition-all text-center"
          >
            View
          </a>
        </div>
      </div>
    {/each}
  </div>
</div>
