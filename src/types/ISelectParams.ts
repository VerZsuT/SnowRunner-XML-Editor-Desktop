import type { InputType, ParamType } from '#g/enums'

export default interface ISelectParams {
  attribute: string
  label: string
  value: string | undefined
  selectParams: {
    label: string
    value: string | string[]
  }[]
  selector: string
  paramType: ParamType
  inputType: InputType
  default: string
}
