export type KaviErrorOptions = {
  code?: number,
  title?: string,
  description?: string,
  data?: object
}

export class KaviError<const Options extends KaviErrorOptions> {
  readonly code: Options["code"] extends number ? Options["code"] : undefined
  readonly title: Options["title"] extends string ? string : undefined
  readonly description: Options["description"] extends string ? string : undefined
  readonly data: Options["data"] extends object ? Options["data"] : undefined

  constructor(opts: Options) {
    this.code = opts.code as Options["code"] extends number ? Options["code"] : undefined
    this.title = opts.title as Options["title"] extends string ? string : undefined
    this.description = opts.description as Options["description"] extends string ? string : undefined
    this.data = opts.data as Options["data"] extends object ? Options["data"] : undefined
  }
}

export class AnyError {
  constructor(readonly error: any) {}
}

export function anyError(e: any) {
  return new AnyError(e)
}

export function error<const T extends KaviErrorOptions>(opts: T) {
  return new KaviError(opts)
}

const err = error({
  code: 404,
  data: {
    a: 1
  }
})

type E = typeof err
//    ^?

export function isError<T, E extends KaviErrorOptions>(value: T | KaviError<E>): value is KaviError<E> {
  return value instanceof KaviError
}