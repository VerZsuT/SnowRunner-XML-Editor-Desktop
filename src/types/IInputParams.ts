import type IInputAreas from './IInputAreas'

import type { FileType, InputType, NumberType, ParamType } from '#enums'

interface IInputParams {
  attribute: string
  label: string
  value?: string | number
  selector: string
  paramType: ParamType
  inputType: string
  type: InputType
  min: number
  max: number
  step: number
  numberType: NumberType
  fileType?: FileType
  default?: string | number
  areas?: IInputAreas
}

export default IInputParams
