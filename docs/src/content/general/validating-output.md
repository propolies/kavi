---
description: To make sure you're not returning any sensitive information, you can validate what you return to the client.
---

## Returns
Validates that the output of the call function
> This will not validate thrown errors
### Example
```ts
import { all } from 'kavi/server'
import z from 'zod'

all
  .returns(z.number())
  .call(() => {
    return 1 // will pass
    return "hi" // will throw a ZodError
  })
```