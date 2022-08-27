import type {InputParams} from './InputParams'
import type {ItemGetterProps} from './ItemGetterProps'

export type InputGetter = (props: ItemGetterProps) => [InputParams] | []
