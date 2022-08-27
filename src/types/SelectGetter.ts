import type {ItemGetterProps} from './ItemGetterProps'
import type {SelectParams} from './SelectParams'

export type SelectGetter = (props: ItemGetterProps) => [SelectParams] | []
