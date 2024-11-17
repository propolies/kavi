import { tick } from "svelte"
import type { AnyError, Result } from "../result.js"
import z, { ZodError } from 'zod'

export function Form<Data extends Record<string, unknown>, R, Fields extends Record<string, string | number>>(
  api: (arg: Data) => Result<R>,
  {
    schema,
    onsuccess,
    onerror,
    beforesubmit,
  }: {
    schema: z.ZodType<Fields>,
    onsuccess?: (arg: R) => void,
    onerror?: (e: AnyError) => void,
    beforesubmit: (fields: Fields) => Data
  },
) {

  type Errors = z.ZodError<{
    [P in keyof Data]?: any
  } & Fields>["formErrors"]["fieldErrors"]

  const form = $state({
    loading: false,
    fields: {} as Fields,
    errors: {} as Errors,
    setErrors: async (errors: ZodError) => {
      form.errors = errors.formErrors.fieldErrors
      await tick()
      const invalidInput = document.querySelector('[aria-invalid="true"]')
      if (invalidInput instanceof HTMLInputElement) {
        invalidInput.focus()
      }
    },
    onsubmit: async (e: SubmitEvent) => {
      e.preventDefault()
      const { success, error } = schema.safeParse(form.fields)
      if (!success) {
        form.setErrors(error)
        return
      }
      form.errors = {}
      form.loading = true
      await api(beforesubmit(form.fields)).match({
        ok: onsuccess ?? (() => {}),
        error: (e) => {
          if (e.error instanceof z.ZodError) {
            form.setErrors(e.error)
          }
          onerror?.(e)
        },
      })
      form.loading = false
    },
  })
  return form
}

export function formError(errors: Record<string, string>) {
  const zodErrors = Object.entries(errors).map(([ path, message ]) => {
    return {
      code: z.ZodIssueCode.custom,
      path: [path],
      message
    }
  })
  return new ZodError(zodErrors)
}
