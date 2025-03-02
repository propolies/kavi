import { getSingletonHighlighter } from "shiki"

export const load = async () => {
  const highlighter = await getSingletonHighlighter({
    langs: ["plaintext", import("shiki/langs/typescript.mjs"), import("shiki/langs/svelte.mjs")],
    themes: [import("shiki/themes/github-dark.mjs")],
  })

  const highlight = ({ value, lang }: { value: string; lang: string }) => {
    return highlighter.codeToHtml(value, {
      lang,
      theme: "github-dark",
    })
  }

  const example1server = highlight({
    value: `// server.ts
import { all } from "kavi/server"
import z from "zod"

export const router = {
  divide: all
    .args(z.tuple([z.number(), z.number()]))
    .call(([a, b]) => {
      if (b == 0) throw new Error("Division by zero")
      return a / b
    }),
}
export type Router = typeof router`,
    lang: "ts",
  })

  const example1client = highlight({
    value: `// client
import { api } from "$lib/kavi/client.js";

async function divide(a: number, b: number) {
  // will return undefined on errors
  return api.divide([a, b]).ok() 
}`,
    lang: "ts",
  })

  const example1snippet_a = highlight({
    value: `divide([6, 2])`,
    lang: "ts",
  })

  const example1snippet_b = highlight({
    value: `divide([6, 0])`,
    lang: "ts",
  })

  return {
    example1: {
      client: example1client,
      server: example1server,
      snippet_a: example1snippet_a,
      snippet_b: example1snippet_b,
    },
  }
}
