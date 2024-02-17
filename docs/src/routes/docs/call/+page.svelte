<script lang="ts">
  import Code from "$lib/components/code.svelte";
</script>

<h1>
  Call
</h1>
<p>
  To make server calls we need to use the default <code>context</code> object, which we will get more into in the <a href="/docs/context">context</a> section.
</p>
<Code directory="router.ts" code={`
import { context } from 'svelte-api'

export const router = {
  hi: context
    .call(() => {
      // This happens on the server
      console.log("hi server")
    })
}
`} />
<p>
  Heres an example on how it can be used.
</p>
<Code lang="svelte" directory="+page.svelte" code={`
<script>
  import { r } from '$lib/sapi/client'
<\/script>

<button on:click={async () => await r.hi()} />
`} />

<h1>Returning a value</h1>
<Code directory="router.ts" code={`
import { context } from 'svelte-api'

export const router = {
  one: context
    .call(() => {
      return 1
    })
}
`} />
<p>
  In order to use the returned value we use a matcher.
</p>
<Code code={`
const res = await r.one()
res.match({
  ok: (res) => {}, // no error occured
  error: (err) => {} // error occured
})
// Can also be used as a default value
const dataOrDefault = res.match({
  ok: (res) => res,
  error: (err) => 1 // default
})
`} />
<p>
  If we only want to check for <code>ok</code> or <code>error</code>
</p>
<Code code={`
const res = await r.one()

// Will be undefined if an error occured
const data = res.ok()

// Will be undefined if no error occured
const error = res.error() 
`} />
<p>
  Like the matcher we can also do something on <code>ok</code>
</p>
<Code code={`
const res = await r.one()

// Will be undefined if an error occured
const data = res.ok((data) => /* do something with data */)

// Will be undefined if no error occured
const data = res.error((error) => 1)
`} />
