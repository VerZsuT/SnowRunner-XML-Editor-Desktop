import type {InputParams} from './InputParams'

export interface ParameterProps {
    item: InputParams
    value: string
    defaultValue: string
    onSetValue(value: string): void
}
