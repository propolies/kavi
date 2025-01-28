import type { MaybePromise } from "./types.js"

export class AnyError {
  constructor(public error: unknown) {}
}

export function isError<T>(value: T | AnyError): value is AnyError {
  return value instanceof AnyError
}

export class Result<T> {
  constructor(private fn: () => MaybePromise<T>) {}

  private async runFn() {
    try {
      const res = await this.fn()
      return res
    } catch (e) {
      return new AnyError(e)
    }
  }

  ok(): Promise<T | undefined>
  ok<Return>(ok: (value: T) => Return): Promise<Return | undefined>
  async ok<Return>(ok?: (value: T) => Return) {
    const res = await this.runFn()
    if (isError(res)) return
    return ok ? ok(res) : res
  }

  default<Value>(value: Value): Promise<T | Value> {
    return this.match({
      ok: (value) => value,
      error: () => value
    })
  }

  error(): Promise<AnyError | undefined>
  error<Return>(err: (value: AnyError) => Return): Promise<Return | undefined>
  async error<Return>(err?: (value: AnyError) => Return) {
    const res = await this.runFn()
    if (!isError(res)) return
    return err ? err(res) : res
  }

  async run(): Promise<[Awaited<T>, undefined] | [undefined, AnyError]> {
    const res = await this.runFn()
    return isError(res)
      ? [undefined, res]
      : [res, undefined] as const
  }

  async expect(customError?: (error: unknown) => unknown) {
    const res = await this.runFn()
    if (isError(res)) throw customError ? customError(res.error) : res.error
    return res
  }

  match<A, B>(opts: { ok: (value: T) => A, error: (err: AnyError) => B }): Promise<A | B>
  match<A>(opts: { ok: (value: T) => A }): Promise<A | AnyError>
  match<B>(opts: { error: (err: AnyError) => B }): Promise<T | B>
  async match<A, B>({ ok, error }: {
    ok?: (value: T) => A,
    error?: (err: AnyError) => B
  }) {
    const res = await this.runFn()
    return isError(res)
      ? error ? error(res) : res
      : ok ? ok(res) : res
  }
}