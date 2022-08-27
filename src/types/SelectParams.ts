import type {ParamType} from 'enums'

export interface SelectParams {
    attribute: string
    label: string
    value: string
    selectParams: {
        label: string
        value: string
    }[]
    selector: string
    paramType: ParamType
    inputType: string
    default: string
}
