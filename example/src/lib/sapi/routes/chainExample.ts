import { context } from "@svelte-api/core";

const first = context.use(() => {
  console.log("first middleware run")
  return {
    firstContext: 1
  }
})

const second = context.use(() => {
  console.log("second middleware run")
  return {
    secondContext: 2
  }
})

const third = context.use(() => {
  console.log("third middleware run")
  return {
    thirdContext: 3
  }
})

export default {
  oneTwoThree: first
    .chain(second)
    .chain(third)
    .call(({ firstContext, secondContext, thirdContext }) => {
      console.log(firstContext, secondContext, thirdContext)
      return firstContext + secondContext + thirdContext
    })
}