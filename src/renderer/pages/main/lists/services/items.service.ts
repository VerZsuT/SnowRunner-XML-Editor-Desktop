import { Category, PreloadType, SrcType } from '#g/enums'
import type { IItem, IListPreload } from '#g/types'
import { XMLDOM } from '#r/scripts/xml'
import { config, preload } from '#r/services'

const { getList } = preload.get<IListPreload>(PreloadType.lists)
const { settings } = config

class ItemsService {
  getMain(category: Category): IItem[] {
    const array = getList(category, SrcType.main)

    return array.map(value => {
      if (category !== Category.trucks) {
        return value
      }

      const dom = XMLDOM.fromPath(value.path)
      const $Truck = dom.select('Truck')

      if (
        !$Truck.exists
        || $Truck.getAttr('Type') !== 'Trailer'
      ) return value
    }).filter(value => !!value) as IItem[]
  }

  filterByCategory(array: IItem[], category: Category): IItem[] {
    return array.map(value => {
      const dom = XMLDOM.fromPath(value.path)
      const $Truck = dom.select('Truck')

      if (!$Truck.exists) return

      if (
        (category === Category.trailers && $Truck.getAttr('Type') === 'Trailer')
        || (category === Category.trucks && $Truck.getAttr('Type') !== 'Trailer')
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

const items = new ItemsService()

export default items
