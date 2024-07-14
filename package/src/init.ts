import * as fs from 'fs'

if (!fs.readdirSync(".").includes("src") && !fs.readdirSync(".").includes("package.json")) {
  throw new Error("The init script should be run in the root")
}

const isLib = fs.existsSync("src/lib")
const kaviPath = `src/${isLib ? "lib/" : ""}kavi`

if (fs.existsSync("kavi")) {
  throw new Error("Kavi folder should be empty")
}

fs.mkdirSync(kaviPath)

fs.writeFileSync("src/hooks.server.ts", `import { createHandle } from 'kavi/server'
import { router } from '$lib/kavi/server'
import { options } from '$lib/kavi/options'

export const handle = createHandle(router, options)
`)

fs.writeFileSync(`${kaviPath}/client.ts`, `import { createApiClient } from 'kavi/client'
import { options } from './options'
import type { Router } from '$lib/kavi/server'

export const api = createApiClient<Router>(options)`)

fs.writeFileSync(`${kaviPath}/options.ts`, `import { createOptions } from 'kavi'
export const options = createOptions()`)

fs.writeFileSync(`${kaviPath}/server.ts`, `export const router = {}
export type Router = typeof router`)
