import { Category, PreloadType, SrcType } from '#g/enums'
import type { IItem, IListPreload } from '#g/types'
import { XMLDOM } from '#r/scripts/xml'
import { Config, Preload } from '#r/services'

export default class ItemsService {
  private static readonly preload = Preload.get<IListPreload>(PreloadType.lists)
  private static readonly settings = Config.settings

  static getMain(category: Category): IItem[] {
    const array = this.preload.getList(category, SrcType.main)

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

  static filterByCategory(array: IItem[], category: Category): IItem[] {
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

  static getDLC(category: Category): IItem[] {
    const newArray: IItem[] = []
    if (!this.settings.DLC) return []

    this.preload.getList(category, SrcType.dlc).forEach(dlc => {
      dlc.items?.forEach(item => {
        newArray.push({
          ...item,
          dlcName: dlc.dlcName
        })
      })
    })

    return this.filterByCategory(newArray, category)
  }

  static getMods(category: Category): IItem[] {
    const newArray: IItem[] = []
    if (!this.settings.mods) return []

    this.preload.getList(category, SrcType.mods).forEach(mod => {
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
