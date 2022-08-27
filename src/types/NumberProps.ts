import type {NumberType} from 'enums'

import type {DefaultInputProps} from './DefaultInputProps'
import type {InputProps} from './InputProps'

export type NumberProps = DefaultInputProps & {
    type?: NumberType
    min?: InputProps['min']
    max?: InputProps['max']
    step?: number
    default?: number
    areas?: InputProps['areas']
}
