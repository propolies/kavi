import { Err } from "./types.js"

export class Result<T> {
  constructor(private res: { data: T } & Err) {}

  ok(): T | undefined
  ok<Return>(ok: (value: T) => Return): Return | undefined
  ok<Return>(ok?: (value: T) => Return) {
    const { data, error } = this.res
    if (error) return undefined
    return ok ? ok(data) : data
  }

  error(): string | undefined
  error<Return>(err: (value: string) => Return): Return | undefined
  error<Return>(err?: (value: string) => Return) {
    const { error } = this.res
    if (!error) return undefined
    return err ? err(error) : error
  }

  match<Result>({ ok, error }: { ok: (value: T) => Result, error: (err: string) => Result }): Result {
    const { data, error: err } = this.res
    return err ? error(err) : ok(data)
  }
}