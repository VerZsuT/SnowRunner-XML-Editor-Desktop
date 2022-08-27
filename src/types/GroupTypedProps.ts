import type {NameType} from 'enums'

import type {GroupLabel} from './GroupLabel'
import type {GroupProps} from './GroupProps'

interface TagNameLabel {
    type: NameType.tagName
    selector: GroupLabel['selector']
}

interface ComputedLabel {
    type: NameType.computed
    attribute: GroupLabel['attribute']
    selector: GroupLabel['selector']
}

/** Параметры группы. */
export type GroupTypedProps = GroupProps & {
    label?: string | TagNameLabel | ComputedLabel
}
