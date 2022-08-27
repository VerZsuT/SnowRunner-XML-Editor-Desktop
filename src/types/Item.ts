import type {FindItem} from './FindItem'

export interface Item {
    dlcName?: string
    modId?: string
    id?: string
    name?: string
    path?: string
    items?: FindItem[]
}
