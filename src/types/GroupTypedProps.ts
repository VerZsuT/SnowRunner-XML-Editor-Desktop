import type IGroupLabel from './IGroupLabel'
import type IGroupProps from './IGroupProps'

/** Параметры группы */
type GroupTypedProps = Omit<IGroupProps, 'label'> & {
  label: string | IGroupLabel
}

export default GroupTypedProps
