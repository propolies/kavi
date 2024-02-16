import { Err } from "./types.js"

export class Result<T> {
  constructor(private res: { data: T } & Err) {}

  match<Result, Error>({ ok, error }: { ok: (res: T) => Result, error: (err: string) => Error }) {
    const { data, error: err } = this.res
    return err ? error(err) : ok(data)
  }
}