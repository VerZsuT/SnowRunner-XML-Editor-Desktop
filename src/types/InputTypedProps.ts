import type InputProps from './InputProps'

import type { InputType } from '#g/enums'

type InputTypedProps =
  (Omit<InputProps, 'type'> & ({
    type?: InputType.number
  } | {
    type: InputType.coordinates
  } | {
    type: InputType.text
  })
    | (Omit<InputProps, 'type' | 'fileType'> & {
      type: InputType.file
      fileType: InputProps['fileType']
    }))

export default InputTypedProps
