import type InputType from '../enums/InputType'
import type IInputClassProps from './IInputClassProps'

/**  */
type InputClassProps = IInputClassProps & ({
    type?: InputType.number
    numberType?: IInputClassProps['numberType']
    step?: IInputClassProps['step']
    areas?: IInputClassProps['areas']
    min?: IInputClassProps['min']
    max?: IInputClassProps['max']
    default?: IInputClassProps['default']
} | {
    type: InputType.coordinates
} | {
    type: InputType.text
    default?: IInputClassProps['default']
} | {
    type: InputType.file
    fileType: IInputClassProps['fileType']
})

export default InputClassProps
