import type { InputProps } from './InputProps'

import type { InputType } from '#enums'

export type InputTypedProps = InputProps & ({
  type?: InputType.number
  numberType?: InputProps['numberType']
  step?: InputProps['step']
  areas?: InputProps['areas']
  min?: InputProps['min']
  max?: InputProps['max']
  default?: InputProps['default']
} | {
  type: InputType.coordinates
} | {
  type: InputType.text
  default?: InputProps['default']
} | {
  type: InputType.file
  fileType: InputProps['fileType']
})
