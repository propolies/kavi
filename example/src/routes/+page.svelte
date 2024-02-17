<script lang="ts">
  import { r } from "$lib/sapi/client";
</script>

<button on:click={async () => {
  const res = await r.one()
  console.log(res.ok())
}}>
  call
</button>

<button on:click={async () => {
  const res = await r.add([2, 2])
  res.match({
    ok: (res) => console.log("res", res),
    error: (err) => console.log("error", err)
  })
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
  const res = await r.cookies.get()
  res.match({
    ok: (res) => console.log(res),
    error: () => {}
  })
}}>
  get cookies
</button>