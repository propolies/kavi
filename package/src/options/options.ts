import { getDevalue, type DevalueOptions } from './devalue'

export type Options = {
  devalue: {
    stringify: (value: unknown) => string
    parse: (value: string) => unknown
  }
}

export function createOptions(options: {
  devalue?: DevalueOptions
} = {}): Options {
  return {
    devalue: getDevalue(options.devalue)
  }
}
