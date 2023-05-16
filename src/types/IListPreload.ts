import type IFindItem from './IFindItem'
import type IItem from './IItem'

import type { Category, SrcType } from '#g/enums'

interface IListPreload {
  removeDir(path: string): void
  getModPak(): IFindItem | undefined
  findMods(): Promise<IFindItem[]>
  getList(listType: Category, from?: SrcType): IItem[]
}

export default IListPreload