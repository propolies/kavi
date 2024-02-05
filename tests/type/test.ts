import { assert, Equals } from 'tsafe'
import type { Cookies, RequestEvent } from '@sveltejs/kit'
import { context, createClientRouter, type ClientRouter } from 'svelte-api'
import z from 'zod'

type Context = {
  event: RequestEvent,
  cookies: Cookies
}

const router = {
  // Test call
  call: context
  .call(ctx => {
    // Test context
    type Ctx = typeof ctx
    assert<Equals<Context, Ctx>>()
    return 1
  }),

  // Test args
  args: context
    .args(z.number())
    .call((args, ctx) => {
      // Test context
      type Ctx = typeof ctx
      assert<Equals<Context, Ctx>>()

      // Test args
      type Args = typeof args
      type ExpectedInput = number
      assert<Equals<ExpectedInput, Args>>()
    }),
  
  // Test nesting
  parent: {
    child: context
      .call(ctx => {
        // Test context
      type Ctx = typeof ctx
      assert<Equals<Context, Ctx>>()
      })
  },

  // Test async
  asfn: context
    .call(async () => {})
}

// Test client router
type R = ReturnType<typeof createClientRouter<ClientRouter<typeof router>>>
type ExpectedR = {
  call: () => Promise<number>,
  args: (n: number) => Promise<void>,
  parent: {
    child: () => Promise<void>
  },
  asfn:() => Promise<void>
}
assert<Equals<ExpectedR, R>>()