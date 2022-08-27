import type {GroupParams} from './GroupParams'
import type {ItemGetterProps} from './ItemGetterProps'

export type GroupGetter = (props: ItemGetterProps) => [GroupParams] | any[]
