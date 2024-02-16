import { assert, Equals } from 'tsafe'
import type { Cookies, RequestEvent } from '@sveltejs/kit'
import { context, createClientRouter, type ClientRouter, Result } from 'svelte-api'
import z from 'zod'

type Context = {
  event: RequestEvent,
  cookies: Cookies
}

const user = context.use(() => {
  return {
    id: 123
  }
})

const callRouter = {
  // Test call
  call: context
  .call(ctx => {
    // Test context
    type Ctx = typeof ctx
    assert<Equals<Context, Ctx>>()
    return 1
  }),
}

const argsRouter = {
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
}

const nestingRouter = {
  // Test nesting
  parent: {
    child: context
      .call(ctx => {
        // Test context
      type Ctx = typeof ctx
      assert<Equals<Context, Ctx>>()
      })
  },
}

const asyncRouter = {
  // Test async
  asfn: context
    .call(async () => {}),
}

const useRouter = {
  // Test use
  use: user
    .call(ctx => {
      type Ctx = typeof ctx
      assert<Equals<Context & { id: number }, Ctx>>()
    })
}

type GetRouter<R extends object> = ReturnType<typeof createClientRouter<ClientRouter<R>>>

// Test client call router
type ExpectedCallRouter = {
  call: () => Promise<Result<number>>,
}
assert<Equals<ExpectedCallRouter, GetRouter<typeof callRouter>>>()

// Test client args router
type ExpectedArgsRouter = {
  args: (n: number) => Promise<Result<void>>,
}
assert<Equals<ExpectedArgsRouter, GetRouter<typeof argsRouter>>>()

// Test client nesting router
type nestingRouter = GetRouter<typeof nestingRouter>
type ExpectedNestingRouter = {
  parent: {
    child: () => Promise<Result<void>>;
  };
}
assert<Equals<ExpectedNestingRouter, nestingRouter>>()

// Test client async router
type AsyncRouter = GetRouter<typeof asyncRouter>
type ExpectedAsyncRouter = {
  asfn:() => Promise<Result<void>>,
}
assert<Equals<ExpectedAsyncRouter, AsyncRouter>>()

// Test client use router
type UseRouter = GetRouter<typeof useRouter>
type ExpectedUseRouter = {
  use: () => Promise<Result<void>>
}
assert<Equals<ExpectedUseRouter, UseRouter>>()