import type { ParamType } from '#enums'

export interface ISelectParams {
  attribute: string
  label: string
  value: string | undefined
  selectParams: {
    label: string
    value: string
  }[]
  selector: string
  paramType: ParamType
  inputType: string
  default: string
}
