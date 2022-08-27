import type {InputBaseProps} from './InputBaseProps'
import type {SelectOptions} from './SelectOptions'

export interface SelectProps<T extends SelectOptions> extends InputBaseProps {
    options: T
}
