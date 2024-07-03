import { getSingletonHighlighter } from 'shiki'

// @ts-expect-error "this is js"
export const highlight = async ({ value, lang }) => {
  const highlighter = await getSingletonHighlighter({
    langs: [
      'plaintext',
      import("shiki/langs/typescript.mjs"),
      import("shiki/langs/svelte.mjs")
    ],
    themes: [import('shiki/themes/github-dark.mjs')]
  })
  return highlighter.codeToHtml(value, {
    lang,
    theme: 'github-dark',
  })
}