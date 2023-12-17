import { Category, SourceType } from '../../enums'

import type { File } from '/mods/renderer'
import { Config, DLCs, Dirs, Mods, TruckFileType, TruckXML } from '/mods/renderer'

class ItemsUtils {
  async getMain(category: Category): Promise<File[]> {
    return this.filterByCategory(await this.getList(category, SourceType.main), category)
  }

  async getDLC(category: Category): Promise<File[]> {
    return this.filterByCategory(await this.getList(category, SourceType.dlc), category)
  }

  async getMods(category: Category): Promise<File[]> {
    if (!Config.useMods) return []
    return this.filterByCategory(await this.getList(category, SourceType.mods), category)
  }

  private async filterByCategory(array: File[], category: Category): Promise<File[]> {
    const result: File[] = []
    for (const file of array) {
      const xml = await TruckXML.fromFile(file)
      if (!xml?.exists()) continue

      if (
        (category === Category.trailers && xml.Type === TruckFileType.trailer)
        || (category === Category.trucks && xml.Type !== TruckFileType.trailer)
      ) result.push(file)
    }
    return result.filter(Boolean)
  }

  private async getList(category: Category, from?: SourceType): Promise<File[]> {
    if (from === SourceType.dlc) {
      const array: File[] = []

      for (const dlc of DLCs) {
        const classes = dlc.dir.dir('classes')
        if (category === Category.trucks) {
          array.push(...await classes.dir('trucks').findFiles({ ext: 'xml' }))
        }
        else if (category === Category.trailers) {
          array.push(...await classes.dir('trucks/trailers').findFiles({ ext: 'xml' }))
        }
      }

      return array
    }
    if (from === SourceType.mods) {
      const array: File[] = []

      for (const mod of Mods) {
        const modClasses = Dirs.modsTemp.dir(mod.name, 'classes')

        if (category === Category.trucks) {
          array.push(...await modClasses.dir('trucks').findFiles({ ext: 'xml' }))
        }
        else if (category === Category.trailers) {
          array.push(...await modClasses.dir('trucks/trailers').findFiles({ ext: 'xml' }))
        }
      }

      return array
    }

    if (category === Category.trucks) {
      return await Dirs.classes.dir('trucks').findFiles({ ext: 'xml' })
    }

    if (category === Category.trailers) {
      return await Dirs.classes.dir('trucks/trailers').findFiles({ ext: 'xml' })
    }

    return []
  }
}

export default new ItemsUtils()
