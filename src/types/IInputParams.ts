import type IInputAreas from './IInputAreas'

import type { FileType, InputType, NumberType, ParamType } from '#enums'

interface IInputParams {
  attribute: string
  label: string
  value: string | number | undefined
  selector: string
  paramType: ParamType
  inputType: string
  type: InputType
  min: number
  max: number
  step: number
  numberType: NumberType
  fileType: FileType | undefined
  default: string | number | undefined
  areas: IInputAreas | undefined
}

export default IInputParams
