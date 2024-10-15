import { tick } from "svelte"
import type { AnyError, Result } from "../result.js"
import z from 'zod'

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
    setErrors: (errors: Errors) => {
      form.errors = errors
      tick()
      const invalidInput = document.querySelector('[aria-invalid="true"]')
      console.log(invalidInput)
      if (invalidInput instanceof HTMLInputElement) {
        invalidInput.focus()
      }
    },
    onsubmit: async (e: SubmitEvent) => {
      e.preventDefault()
      console.log(form.fields)
      const { success, error } = schema.safeParse(form.fields)
      if (!success) {
        form.setErrors(error.formErrors.fieldErrors)
        return
      }

      form.loading = true
      await new Promise(r => setTimeout(r, 1000))
      await api(beforesubmit(form.fields)).match({
        ok: onsuccess ?? (() => {}),
        error: (e) => {
          if (e instanceof z.ZodError) {
            form.setErrors(e.formErrors.fieldErrors)
          }
          onerror?.(e)
        },
      })
      form.loading = false
    },
  })
  return form
}
