<script lang="ts">
  import '../app.css'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Plug, Unplug } from '@steeze-ui/lucide-icons'
  import { createWsClient } from 'kavi/client'
  import type { Wss } from '$lib/kavi/server'

  const Ws = createWsClient<Wss>()
  type WebSocket = Awaited<ReturnType<typeof Ws>>

  let ws: WebSocket | undefined = $state()
  const establishWebSocket = async () => {
    console.log("[websocket] connecting...")
    ws = await Ws()
    console.log('[websocket] connected')

    ws.addEventListener('close', () => {
      console.log('[websocket] connection closed')
      ws = undefined
    })
    ws.addEventListener("error", (e) => {
      console.log("error", e)
    })

    ws.on("msg", (data) => {
      console.log("[global]", data)
    })
  }
</script>

{#snippet RoomButton(room: number)}
  {@const joined = ws?.rooms.has(room)}
  <div class="flex flex-col gap-2">
    <button 
      onclick={async () => {
        if (joined) {
          await ws?.leave(room)
        } else {
          await ws?.join(room)
          ws?.on("msg", (data) => {
            console.log(`[room ${room}]`, data)
          }, room)
        }
      }}
      class="btn {!ws && "btn-disabled"}"
    >
      <p>Join room {room}</p>
      <input type="checkbox"  checked={joined} class="checkbox pointer-events-none" />
    </button>
    <button 
      onclick={() => ws?.emit("msg", `ping ${room}`, room)}
      class="btn {(!ws || !joined) && "btn-disabled"}"
    >
      Ping room
    </button>
  </div>
{/snippet}

<main class="flex flex-col gap-8 [&>*]:gap-4 m-4">
  <div class="flex">
    <button class="btn btn-success {ws && "btn-disabled"}" onclick={establishWebSocket}>
      <p class="text-base">Connect</p>
      <Icon src={Plug} class="size-5" />
    </button>
    
    <button class="btn btn-warning {!ws && "btn-disabled"}" onclick={() => ws?.close()}>
      <p class="text-base">Close</p>
      <Icon src={Unplug} class="size-5" />
    </button>

    <a class="btn btn-primary text-base" href="/api">
      Go to api
    </a>
  </div>
  
  <button
    class="btn {!ws && "btn-disabled"}"
    onclick={() => ws?.emit("msg", "hey")}
  >
    Test
  </button>

  <div class="flex">
    {#each [1, 2, 3] as room}
      {@render RoomButton(room)}
    {/each}
  </div>
</main>