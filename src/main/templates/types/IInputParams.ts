import type FileType from '../enums/FileType'
import type InputType from '../enums/InputType'
import type NumberType from '../enums/NumberType'
import type ParamType from '../enums/ParamType'
import type InputAreas from './InputAreas'

interface IInputParams {
    name: string
    text: string
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
    desc: string
    default: string | number
    areas: InputAreas
}

export default IInputParams