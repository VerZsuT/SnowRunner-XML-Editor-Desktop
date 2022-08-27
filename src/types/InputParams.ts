import type {FileType, InputType, NumberType, ParamType} from 'enums'

import type {InputAreas} from './InputAreas'

export interface InputParams {
    attribute: string
    label: string
    value: string | number
    selector: string
    paramType: ParamType
    inputType: string
    type: InputType
    min: number
    max: number
    step: number
    numberType: NumberType
    fileType: FileType
    default: string | number
    areas: InputAreas
}
