import type { Cookies } from '@sveltejs/kit'
import type { CookieParseOptions, CookieSerializeOptions } from 'cookie'

interface Cookie {
  name: string,
  value: string,
  opts: CookieSerializeOptions & { path: string }
}

export class CookiesWrapper implements Cookies {
  private setCookies: Cookie[] = []

  constructor(private cookies: Cookies) {}

  set(name: string, value: string, opts: CookieSerializeOptions & { path: string }): void {
    this.setCookies.push({ name, value, opts })
    this.cookies.set(name, value, opts)
  }

  delete(name: string, opts: CookieSerializeOptions & { path: string; }): void {
    this.setCookies.push({ 
      name, 
      value: "", 
      opts: {
        ...opts,
        maxAge: 0,
      }
    })
  }

  get(name: string, opts?: CookieParseOptions | undefined): string | undefined {
    return this.cookies.get(name, opts)
  }

  getAll(opts?: CookieParseOptions | undefined): { name: string; value: string }[] {
    return this.cookies.getAll(opts)
  }

  serialize(name: string, value: string, opts: CookieSerializeOptions & { path: string }): string {
    return this.cookies.serialize(name, value, opts)
  }

  getSetCookies(): string {
    return this.setCookies.map(({ name, value, opts }) => (
      this.serialize(name, value, opts)
    )).join(",")
  }
}