import type InputElementProps from './InputElementProps'
import type ISelectOptions from './ISelectOptions'

interface ISelectClassProps<T extends ISelectOptions> extends InputElementProps {
    options: T
}

export default ISelectClassProps
