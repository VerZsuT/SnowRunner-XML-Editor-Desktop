import type IInputBaseProps from './IInputBaseProps'
import type SelectOptions from './SelectOptions'

type SelectProps<T extends SelectOptions> = Omit<IInputBaseProps, 'default'> & {
  options: T
  default?: number
}

export default SelectProps
