import { assert, Equals } from 'tsafe'
import type { Cookies, RequestEvent } from '@sveltejs/kit'
import { context, createClientRouter, type Pretty, type ToPromise } from 'svelte-api'

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
    .args<number>()
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

// Test router
type R = ReturnType<typeof createClientRouter<Pretty<ToPromise<typeof router>>>>
type ExpectedR = {
  call: (event: RequestEvent) => Promise<number>,
  args: (event: RequestEvent, n: number) => Promise<void>,
  chain: (event: RequestEvent) => Promise<void>,
  parent: {
    child: (event: RequestEvent) => Promise<void>
  },
  asfn:(event: RequestEvent) => Promise<void>
}
assert<Equals<ExpectedR, R>>()