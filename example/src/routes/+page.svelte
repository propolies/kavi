<script lang="ts">
  import { r } from "$lib/sapi/client";
  import { onMount } from "svelte";
</script>

<button on:click={async () => {
  console.log("recieved", await r.one(), "from the server")
}}>
  call one
</button>

<button on:click={async () => {
  console.log("recieved", await r.multiply([3, 4]), "from the server")
}}>
  call multiply
</button>

<button on:click={async () => {
  console.log("recieved", await r.oneTwoThree(), "from the server")
}}>
  call oneTwoThree
</button>
