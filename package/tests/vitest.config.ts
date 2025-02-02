import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  test: {
    exclude: ["unit/**/*.types.test.ts"],
  },
  plugins: [tsconfigPaths()],
})
