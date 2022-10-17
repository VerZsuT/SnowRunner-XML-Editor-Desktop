import type { IInputBaseProps } from './IInputBaseProps'
import type { ISelectOptions } from './ISelectOptions'

export interface ISelectProps<T extends ISelectOptions> extends IInputBaseProps {
  options: T
}
