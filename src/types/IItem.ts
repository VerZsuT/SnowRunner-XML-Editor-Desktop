import type IFindItem from './IFindItem'

export default interface IItem {
  name: string
  path: string
  dlcName?: string
  modId?: string
  id?: string
  items?: IFindItem[]
}
