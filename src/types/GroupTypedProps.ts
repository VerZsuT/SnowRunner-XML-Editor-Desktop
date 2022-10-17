import type { IGroupLabel } from './IGroupLabel'
import type { IGroupProps } from './IGroupProps'

import type { NameType } from '#enums'

interface ITagNameLabel {
  type: NameType.tagName
  selector: IGroupLabel['selector']
}

interface IComputedLabel {
  type: NameType.computed
  attribute: IGroupLabel['attribute']
  selector: IGroupLabel['selector']
}

/** Параметры группы. */
export type GroupTypedProps = IGroupProps & {
  label?: string | ITagNameLabel | IComputedLabel
}
