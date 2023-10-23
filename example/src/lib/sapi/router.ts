import { context } from '@svelte-api/core'
import chainExample from './routes/chainExample'

export const router = {
  one: context
    .call(() => {
      console.log("called one... returning 1 to the client")
      return 1
    }),
  ...chainExample
}
export type Router = typeof router