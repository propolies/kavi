<script lang="ts">
  import "../../app.css"
  import { api } from "$lib/kavi/client"
</script>

<main class="m-4 flex gap-4">
  <button
    onclick={async () => { console.log(await api.ping().ok()) }}
    class="btn btn-accent"
  >
    Ping
  </button>

  <button
    onclick={async () => { console.log(await api.add([1, 2]).ok()) }}
    class="btn btn-accent"
  >
    Add 1 + 2
  </button>
  <button
    onclick={async () => { console.log(await api.cookie.add().ok()) }}
    class="btn btn-accent"
  >
    Add theCookie
  </button>
  <button
    onclick={async () => { console.log(await api.cookie.delete().ok()) }}
    class="btn btn-accent"
  >
    Delete theCookie
  </button>
</main>

<button
  onclick={async () => {
    const [res, error] = await api.crash().run()
    if (error) {
      console.log("error: ", error)
    }
    if (res) {
      console.log("success: ", res)
    }
  }}
  class="btn btn-accent"
>
  run Error
</button>

<button
  onclick={async () => {
    await api.crash().match({
      ok(res) {
        console.log("success: ", res)
      },
      error(e) {
        console.log("error: ", e)
      }
    })
  }}
  class="btn btn-accent"
>
  match Error
</button>

<button
  onclick={async () => {
    console.log(await api.custom().ok())
  }}
  class="btn btn-accent"
>
  Custom Object
</button>

<button
  onclick={async () => {
    await api.async().ok((data) => {
      console.log(data)
    })
  }}
  class="btn btn-accent"
>
  Async call
</button>

<button
  onclick={async () => {
    // @ts-expect-error "Should error"
    const [res, err] = await api.test(1).run()
    console.log("res", res)
    console.log("err", err)
  }}
  class="btn btn-accent"
>
  test
</button>