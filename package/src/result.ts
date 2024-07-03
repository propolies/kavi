import { AnyError, KaviError, type KaviErrorOptions } from "./errors.js"
import type { MaybePromise } from "./types.js"

type Errors<T extends KaviErrorOptions> = T extends KaviErrorOptions
  ? KaviError<T>
  : never

export class Result<T, const E extends KaviErrorOptions> {
  constructor(private fn: () => MaybePromise<T | Errors<E>>) {}

  private isError(value: T | Errors<E> | AnyError): value is Errors<E> | AnyError {
    return value instanceof KaviError || value instanceof AnyError
  }

  private getRes() {
    try {
      return this.fn()
    } catch (e) {
      return new AnyError(e)
    }
  }

  ok(): Promise<T | undefined>
  ok<Return>(ok: (value: T) => Return): Promise<Return | undefined>
  async ok<Return>(ok?: (value: T) => Return) {
    const res = await this.getRes()
    if (this.isError(res)) return
    return ok ? ok(res) : res
  }

  error(): Promise<Errors<E> | AnyError | undefined>
  error<Return>(err: (value: Errors<E> | AnyError) => Return): Promise<Return | undefined>
  async error<Return>(err?: (value: Errors<E> | AnyError) => Return) {
    const res = await this.getRes()
    if (!this.isError(res)) return
    return err ? err(res) : res
  }

  async run(): Promise<[Awaited<T>, undefined] | [undefined, Awaited<Errors<E>> | AnyError]> {
    const res = await this.getRes()
    return this.isError(res)
      ? [undefined, res]
      : [res, undefined] as const
  }

  async expect() {
    const res = await this.fn()
    if (this.isError(res)) {
      throw res
    }
    return res
  }

  match<A, B>(opts: { ok: (value: T) => A, error: (err: Errors<E> | AnyError) => B }): Promise<A | B>
  match<A>(opts: { ok: (value: T) => A }): Promise<A | (Errors<E> | AnyError)>
  match<B>(opts: { error: (err: Errors<E> | AnyError) => B }): Promise<T | B>
  async match<A, B>({ ok, error }: {
    ok?: (value: T) => A,
    error?: (err: Errors<E> | AnyError) => B
  }) {
    const res = await this.getRes()
    return this.isError(res)
      ? error ? error(res) : res
      : ok ? ok(res) : res
  }
}