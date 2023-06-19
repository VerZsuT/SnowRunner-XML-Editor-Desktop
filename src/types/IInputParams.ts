import type IInputAreas from './IInputAreas'

import type { FileType, InputType, NumberType, ParamType } from '#g/enums'

export default interface IInputParams {
  attribute: string
  label: string
  value?: string | number
  selector: string
  paramType: ParamType
  inputType: InputType
  type: InputType
  min: number
  max: number
  step: number
  numberType: NumberType
  fileType?: FileType
  default?: string | number
  areas?: IInputAreas
}
