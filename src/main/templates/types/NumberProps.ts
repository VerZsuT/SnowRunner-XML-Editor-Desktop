import type IInputClassProps from './IInputClassProps'
import type DefaultInputProps from './DefaultInputProps'
import type NumberType from '../enums/NumberType'

type NumberProps = DefaultInputProps & {
    type?: NumberType
    min?: IInputClassProps['min']
    max?: IInputClassProps['max']
    step?: number
    default?: number
    areas?: IInputClassProps['areas']
}

export default NumberProps
