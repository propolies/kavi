import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@dansk-supermarked/svelte-components/src/lib/**/*/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
    }
  },
  plugins: [typography]
}
