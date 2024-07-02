export function setHeadersProxy(headers: Record<string, string>): (newHeaders: Record<string, string>) => void {
  return (newHeaders) => {
    for (const key in newHeaders) {
      const lower = key.toLowerCase()
      const value = newHeaders[key]

      if (lower === 'set-cookie') {
        throw new Error(
          'Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies'
        )
      } else {
        headers[lower] = value
      }
    }
  }
}