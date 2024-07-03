import { defineConfig } from 'mdsx'
import { visit } from "unist-util-visit"
import { rehypeCustomHighlight } from '@mdsx/rehype-custom-highlighter'
import MagicString from 'magic-string'
import rehypeSlug  from 'rehype-slug'
import { highlight } from './src/shiki.js'

/** @type {import('@mdsx/rehype-custom-highlighter').HighlightOptions} */
export const customHighlightOptions = {
  highlight
}

export const mdsxConfig = defineConfig({
  extensions: ['.md'],
  rehypePlugins: [
    [rehypeCustomHighlight, customHighlightOptions],
    [rehypeFormat],
    [rehypeSlug]
  ],
  blueprints: {
    default: {
      path: 'src/blueprints/blueprint.svelte'
    }
  }
})

/**
 * @typedef {import('mdast').Root} MdastRoot
 * @typedef {import('hast').Root} HastRoot
 * @typedef {import('unified').Transformer<HastRoot, HastRoot>} HastTransformer
 */
/**
 * @returns {HastTransformer}
 */
function rehypeFormat() {
  return async (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "pre")
        return

      const meta = node.children[0].data?.meta
      if (!meta) return

      const file = meta
        .match(/file=\S*/g)
        ?.at(0)
        .slice("file=".length)
      if (!file) return

      const code = node.children[0]
      const s = new MagicString(code.value)
      const index = code.value.indexOf("<span")
      s.appendLeft(index, `<div class="file">${file}</div>`)
      code.value = s.toString()
    })
  }
}
