import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsx } from 'mdsx'
import { mdsxConfig } from './mdsx.config.js'
import { readdirSync } from 'fs'
import { fileURLToPath } from "url"
import MagicString from 'magic-string'
const __dirname = fileURLToPath(new URL(".", import.meta.url))

// prerender /content/**/*.md as /docs/**/*
const entries = readdirSync(__dirname + "/src/content")
  .flatMap((folder) => readdirSync(`${__dirname}/src/content/${folder}`)
    .map((file) => `/docs/${folder}/${file.slice(0, -3)}`)
  )

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [mdsx(mdsxConfig), baseurl(), vitePreprocess()],
  extensions: ['.svelte', '.md'],
  kit: {
    adapter: adapter(),
    prerender: {
      entries: [...entries]
    },
    files: {
      lib: "src"
    },
    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
      relative: false
    },
  },
  onwarn(warning, handler) {
    const ext = warning.filename.split(".").at(-1)
    if (ext === "md" && warning.code === "a11y_no_noninteractive_tabindex") {
      return
    }
    handler(warning)
  }
}

function baseurl() {
  const processed = new Set()
  return {
    markup: ({ content, filename }) => {
      const base = process.env.BASE_PATH
      if (!base) return

      const files = filename.split("/")
      const file = files.at(-1)
      const [name, ext] = file.split(".")
      if (ext !== "md") return
      if (content.indexOf('href="/docs') == -1) return -1
      if (processed.has(name)) return

      const section = files.at(-2)
      processed.add(`${section}/${name}`)

      const s = new MagicString(content, { filename })
      s.replaceAll('href="/docs', `href="${base}/docs`)

      return {
        code: s.toString(),
        map: s.generateMap({ file: filename, hires: true })
      }
    }
  }
}

export default config
