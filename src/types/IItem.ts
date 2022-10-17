import type { IFindItem } from './IFindItem'

export interface IItem {
  name: string
  path: string
  dlcName?: string
  modId?: string
  id?: string
  items?: IFindItem[]
}
