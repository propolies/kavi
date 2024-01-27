<script lang="ts">
  import { r } from "../sapi/client";
</script>

<button on:click={async () => {
  console.log(await r.one())
}}>
  call
</button>

<button on:click={async () => {
  console.log(await r.add([1, 3]))
}}>
  call, args
</button>

<button on:click={async () => {
  await r.cookies.set()
}}>
  set cookies
</button>

<button on:click={async () => {
  await r.cookies.delete()
}}>
  delete cookies
</button>

<button on:click={async () => {
  console.log(await r.cookies.get())
}}>
  get cookies
</button>