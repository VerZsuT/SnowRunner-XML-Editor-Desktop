import type IDefaultInputProps from './IDefaultInputProps'
import type InputProps from './InputProps'

import type { NumberType } from '#enums'

type NumberProps = IDefaultInputProps & {
  type?: NumberType
  min?: InputProps['min']
  max?: InputProps['max']
  step?: number
  default?: number
  areas?: InputProps['areas']
}

export default NumberProps
