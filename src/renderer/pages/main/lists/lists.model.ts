import { useMemo } from 'react-afc'

import { selectCategory, selectGroup } from '../store/listSlice'
import { itemsService } from './services'

import type { Category, GroupTab } from '#g/enums'
import type { IItem } from '#g/types'
import { ViewModel, redux, unwrap } from '#r/model-ctrlr'

type Items = {
  main: IItem[]
  dlc: IItem[]
  mods: IItem[]
  all: IItem[]
}

class ListsModel extends ViewModel {
  @redux(selectCategory)
  readonly category!: Category

  @redux(selectGroup)
  readonly group!: GroupTab

  @unwrap
  readonly items = useMemo<Items>(
    () => {
      const main = itemsService.getMain(this.category)
      const dlc = itemsService.getDLC(this.category)
      const mods = itemsService.getMods(this.category)
      const all = [...main, ...dlc, ...mods]
      return { main, dlc, mods, all }
    },
    () => [this.category]
  ) as unknown as Items
}

export default ListsModel