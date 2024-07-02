---
description: The wss api
---

## createWss
```ts file=server.ts
import { createWss } from 'kavi'

export const wss = createWss({
  route: {
    connect: middleware
      .call(() => ...),
    message: middleware
      .call(() => ...),
    onClose: () => ...,
    onError: (error) => ...,
  }
})
export type Wss = typeof wss
```

## Methods

### emit
Message all connected clients.

### cast
Like [emit](#emit), but will exclude the sender

### join
Join a room, to receive messages on the client
```ts
wss.route
  .join(userId) // defaults to 0
  // or
  .join(userId, roomId)
```

### rooms
```ts
wss.route.rooms.get(roomId)
```

## Room 

### clients
```ts
room.clients
```

## Receives messages

```ts file=client
import { Ws } from '$lib/kavi/client'

const ws = new Ws({
  timeout: 2000
})
```

## Ws

## on
Listen for events

### connect
Function to connect to the websocket.

### isConnected
Returns a boolean on wether the websocket is connected or not.
