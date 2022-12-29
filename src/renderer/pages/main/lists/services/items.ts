import { load } from 'cheerio'

import { Category, PreloadType, SrcType } from '#enums'
import { config, preload, system } from '#services'
import type { IItem, IListPreload } from '#types'

const { getList } = preload.get<IListPreload>(PreloadType.lists)
const { settings } = config

class ItemsService {
  getMain(category: Category): IItem[] {
    const array = getList(category, SrcType.main)

    return array.map(value => {
      if (category !== Category.trucks)
        return value

      const fileData = system.readFileSync(value.path)
      const dom = load(fileData, { xmlMode: true })
      const $Truck = dom('Truck')

      if (
        !$Truck.length
        || $Truck.attr('Type') !== 'Trailer'
      ) return value
    }).filter(value => !!value) as IItem[]
  }

  filterByCategory(array: IItem[], category: Category): IItem[] {
    return array.map(value => {
      const fileData = system.readFileSync(value.path as string)
      const $dom = load(fileData, { xmlMode: true })
      const $Truck = $dom('Truck')

      if (!$Truck.length) return

      if (
        (category === Category.trailers && $Truck.attr('Type') === 'Trailer')
        || (category === Category.trucks && $Truck.attr('Type') !== 'Trailer')
      ) return value
    }).filter(value => !!value) as IItem[]
  }

  getDLC(category: Category): IItem[] {
    const newArray: IItem[] = []
    if (!settings.DLC) return []

    getList(category, SrcType.dlc).forEach(dlc => {
      dlc.items?.forEach(item => {
        newArray.push({
          ...item,
          dlcName: dlc.dlcName
        })
      })
    })

    return this.filterByCategory(newArray, category)
  }

  getMods(category: Category): IItem[] {
    const newArray: IItem[] = []
    if (!settings.mods) return []

    getList(category, SrcType.mods).forEach(mod => {
      mod.items?.forEach(item => {
        newArray.push({
          ...item,
          modId: mod.id
        })
      })
    })

    return this.filterByCategory(newArray, category)
  }
}

export default new ItemsService()
