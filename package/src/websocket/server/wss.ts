import { WebSocketServer, WebSocket } from "ws"
import { Schema } from "zod"
import { getOrSet } from "../shared.js"

type Client = {
  id: string
  ws: WebSocket
}

type Room = {
  clients: Set<string>
}

const rooms: Map<number, Room> = new Map([[0, { clients: new Set() }]])
const clients: Client[] = []

export type WssRouterOptions = {
  [key: string]: {
    schema: Schema
  }
}

export function createWss() { // router: WssRouterOptions
  console.log("[wss] wss initialized")
  globalThis.wss = new WebSocketServer({
    noServer: true,
    clientTracking: false
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  globalThis.wss.on('connection', (ws, req) => {
    const joinedRooms: number[] = []
    console.log("[wss] client connected")
    // const cookie = req.heheaders.cookie
    // const cookies = !cookie ? new Map() : new Map(cookie
    //   .split("; ")
    //   .map((cookie) => {
    //     const [name, value] = cookie.split("=")
    //     return [name, JSON.parse(value)]
    //   })
    // )
    const id = crypto.randomUUID()
    clients.push({
      id,
      ws
    })
    clients.forEach(({ ws }) => {
      ws.send(JSON.stringify({
        data: "[wss] client connected"
      }))
    })
    rooms.get(0)?.clients.add(id)
    joinedRooms.push(0)
    ws.on('message', (event) => {
      const res = JSON.parse(event.toString()) as {
        type: "emit"
        data: any,
        room?: number,
        cookie: string,
        event: string
      } | {
        type: "leave" | "join",
        room?: number,
        feedback: number,
        cookie: string
      }
      const { type, room=0 } = res

      switch (type) {
        case "join": {
          getOrSet(rooms, room, {
            clients: new Set<string>()
          })
          rooms.get(room)?.clients.add(id)
          joinedRooms.push(room)
          ws.send(JSON.stringify({
            feedback: res.feedback
          }))
          break
        }
        case "leave": {
          rooms.get(room)?.clients.delete(id)
          ws.send(JSON.stringify({
            feedback: res.feedback
          }))
          break
        }
        case "emit": {
          rooms.get(room)?.clients.forEach((id) => {
            const client = clients.find((c) => c.id == id)
            if (client?.ws.readyState === 1) {
              // auth: findRoute(path, router).message(res.args)
              client.ws.send(JSON.stringify({
                data: res.data,
                event: res.event,
                room
              }))
            }
          })
          break
        }
      }
    })

    ws.on('close', () => {
      console.log(`[wss] client disconnected`)
      joinedRooms.forEach((id) => {
      })
    })
  })
}

type AnyFunc = (...args: unknown[]) => unknown
type MaybeRouter = AnyFunc | object

function findRoute(path: string[], router: MaybeRouter): any {
  const [route, ...rest] = path
  router = router[route as keyof typeof router]
  if (!rest.length) return router
  return findRoute(rest, router)
}