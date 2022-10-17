import type { IFindItem } from './IFindItem'
import type { IItem } from './IItem'

import type { Category, SrcType } from '#enums'

export interface IListPreload {
  removeDir(path: string): void

  getModPak(): IFindItem | undefined

  findMods(): Promise<IFindItem[]>

  getList(listType: Category, from?: SrcType): IItem[]
}
