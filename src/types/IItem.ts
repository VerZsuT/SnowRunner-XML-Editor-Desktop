import type IFindItem from './IFindItem'

interface IItem {
  name: string
  path: string
  dlcName?: string
  modId?: string
  id?: string
  items?: IFindItem[]
}

export default IItem