import type { Cookies } from "@sveltejs/kit"
import type { CookieSerializeOptions } from "cookie"

type CookieOptions = CookieSerializeOptions & { path: string }

interface Cookie {
  name: string
  value: string
  opts: CookieOptions
}

export class CookiesProxy implements Cookies {
  private setCookies: Cookie[] = []

  get: Cookies["get"]
  getAll: Cookies["getAll"]
  serialize: Cookies["serialize"]
  constructor(private cookies: Cookies) {
    this.get = this.cookies.get
    this.getAll = this.cookies.getAll
    this.serialize = this.cookies.serialize
  }

  set(name: string, value: string, opts: CookieOptions): void {
    this.setCookies.push({ name, value, opts })
  }

  delete(name: string, opts: CookieOptions): void {
    this.setCookies.push({
      name,
      value: "",
      opts: {
        ...opts,
        maxAge: 0,
      },
    })
  }

  getSetCookies(): string {
    return this.setCookies
      .map(({ name, value, opts }) => this.serialize(name, value, opts))
      .join(",")
  }
}
