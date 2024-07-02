import type { WssRouterOptions } from "../server/wss.js"
import type * as Z from 'zod'
import { getOrSet } from "../shared.js"
import { Map as ReactiveMap } from 'svelte/reactivity'

export function createWsClient<T extends WssRouterOptions>() {
  return async () => {
    const { host, protocol } = window.location
    const ws = new WebSocket(`${protocol.replace("http", "ws")}//${host}/kavi-ws`)

    let rooms = new ReactiveMap<number, Map<string, Set<(event: unknown) => void>>>([[0, new Map()]])

    function addTempEventListener<T>(
      listener: string,
      callback: (
        close: (returns: T) => void,
        event: any
      ) => void
    ) {
      return new Promise<T>((resolve) => {
        function fn(event: any) {
          callback((returns: T) => {
            ws.removeEventListener(listener, fn)
            return resolve(returns)
          }, event)
        }
        ws.addEventListener(listener, fn)
      })
    }

    ws.addEventListener("message", (_event) => {
      const { data, room: roomId, event } = JSON.parse(_event.data)

      const room = rooms.get(roomId)
      if (!room) return

      const callbacks = room.get(event)
      if (!callbacks) return

      for (const callback of callbacks) {
        callback(data)
      }
    })

    ws.addEventListener("close", () => {
      rooms = new ReactiveMap([[0, new Map()]])
    })

    await addTempEventListener("open", (close) => close(null))

    return {
      on<E extends keyof T & string>(
        event: E,
        callback: (data: Z.infer<T[E]["schema"]>) => void,
        roomId: number=0
      ) {
        const room = rooms.get(roomId)
        if (!room) { throw new Error("not in room") }
        getOrSet(room, event, new Set()).add(callback)
      },
      emit<E extends keyof T>(event: E, data: Z.infer<T[E]["schema"]>, room?: number) {
        ws.send(JSON.stringify({
          type: "emit",
          data,
          room,
          event,
          cookie: document.cookie
        }))
      },
      async join(room: number) {
        const id = crypto.randomUUID()
        getOrSet(rooms, room, new Map())
        ws.send(JSON.stringify({
          type: "join",
          room,
          feedback: id,
          cookie: document.cookie
        }))
        console.log("joining room...")
        return await addTempEventListener<boolean>("message", (close, event) => {
          const res = JSON.parse(event.data)
          if (res.feedback == id) {
            console.log("joined room", room)
            return close(true)
          }
        })
      },
      async leave(room: number) {
        const id = crypto.randomUUID()
        if (!rooms.delete(room)) return

        ws.send(JSON.stringify({
          type: "leave",
          room,
          feedback: id,
          cookie: document.cookie
        }))
        console.log("leaving room...")
        return await addTempEventListener<boolean>("message", (close, event) => {
          const res = JSON.parse(event.data)
          if (res.feedback == id) {
            console.log("left room", room)
            return close(true)
          }
        })
      },
      rooms,
      close: ws.close.bind(ws),
      addEventListener: ws.addEventListener.bind(ws)
    }
  }
}
