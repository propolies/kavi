import type { LanguageFn } from "highlight.js"

const svelte: LanguageFn = (hljs) => {
  return {
    case_insensitive: true,
    name: "svelte",
    subLanguage: "xml",
    contains: [
      {
        begin: "<script>",
        end: "</script>",
        excludeBegin: true,
        excludeEnd: true,
        subLanguage: "typescript",
      },
      {
        begin: "{",
        end: "}",
        subLanguage: "typescript",
        contains: [
          {
            begin: /([#:\/@])(if|else|each|await|then|catch|debug|html|const)/gm,
            className:'keyword',
          },
        ]
      },
      {
        begin: /(on)[:]/gm,
        className: "title"
      }
    ]
  }
}

export default svelte