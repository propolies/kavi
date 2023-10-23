/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#12101B',
        secondary: '#000',
        accent: '#D72444',
        light: '#C9C9C9',
        dark: '#6D758B',
      },
      fontFamily: {
        code: "'Source Code Pro', monospace"
      }
    }
  },
  plugins: []
};