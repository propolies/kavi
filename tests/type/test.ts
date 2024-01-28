import { assert, Equals } from 'tsafe'
import type { Cookies, RequestEvent } from '@sveltejs/kit'
import { context, createClientRouter, type ClientRouter } from 'svelte-api'
import z from 'zod'

const first = context.use(() => {
  return {
    first: 1
  }
})

const second = context.use(() => {
  return {
    second: 2
  }
})

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
    .call((input, ctx) => {
      // Test context
      type Ctx = typeof ctx
      assert<Equals<Context, Ctx>>()

      // Test input
      type Input = typeof input
      type ExpectedInput = number
      assert<Equals<ExpectedInput, Input>>()
    }),
  
  // Test chain
  chain: context
    .chain(first)
    .chain(second)
    .call(ctx => {
      // Test context
      type Ctx = typeof ctx
      type ExpectedCtx = Context & {
        first: number,
        second: number
      }
      assert<Equals<ExpectedCtx, Ctx>>()
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
  chain: () => Promise<void>,
  parent: {
    child: () => Promise<void>
  },
  asfn:() => Promise<void>
}
assert<Equals<ExpectedR, R>>()