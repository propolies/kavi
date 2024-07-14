import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import * as fs from 'fs'
import { $ } from 'zx'

function readDir(path: string) {
  return fs.readdirSync(path).toString()
}

function mkdir(path: string) {
  fs.mkdirSync(path, { recursive: true })
}

afterAll(async () => {
  fs.rmdirSync("./init/temp", { recursive: true })
  fs.rmdirSync("./init/temp2", { recursive: true })
})

describe("init", async () => {
  mkdir("./init/temp")
  mkdir("./init/temp/src/lib")

  await $`cd ./init/temp && npx kavi init`

  const srcFiles = readDir("./init/temp/src")
  const libFiles = readDir("./init/temp/src/lib")

  it("should create hooks.server.ts", async () => {
    expect(srcFiles).toEqual("hooks.server.ts,lib")
  })

  it("should create kavi folder", async () => {
    expect(libFiles).toEqual("kavi")
  })

  it("should have proper files", async () => {
    const kaviFiles = readDir("./init/temp/src/lib/kavi")
    expect(kaviFiles).toEqual("client.ts,options.ts,server.ts")
  })
})

describe("init without lib", async () => {
  mkdir("./init/temp2")
  mkdir("./init/temp2/src")

  await $`cd ./init/temp2 && npx kavi init`

  const srcFiles = readDir("./init/temp2/src")

  it("should have proper src files", async () => {
    expect(srcFiles).toEqual("hooks.server.ts,kavi")
  })

  it("should have proper files", async () => {
    const kaviFiles = readDir("./init/temp2/src/kavi")
    expect(kaviFiles).toEqual("client.ts,options.ts,server.ts")
  })
})