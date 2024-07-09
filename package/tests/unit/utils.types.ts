// eslint-disable-next-line
export function it(description: string, callback: () => void) {}
// eslint-disable-next-line
export function describe(description: string, callback: () => void) {}

export const error404 = {
  code: 404,
  title: "Not found"
} as const