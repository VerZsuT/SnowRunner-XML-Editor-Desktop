import { Category, SourceType } from '../../enums'

import type { IFile } from '/mods/renderer'
import { Config, DLCs, Dirs, Mods, TruckFileType, TruckXML } from '/mods/renderer'

class ItemsUtils {
  async getMain(category: Category): Promise<IFile[]> {
    return this.filterByCategory(await this.getList(category, SourceType.main), category)
  }

  async getDLC(category: Category): Promise<IFile[]> {
    return this.filterByCategory(await this.getList(category, SourceType.dlc), category)
  }

  async getMods(category: Category): Promise<IFile[]> {
    return Config.useMods
      ? this.filterByCategory(await this.getList(category, SourceType.mods), category)
      : []
  }

  private async filterByCategory(array: IFile[], category: Category): Promise<IFile[]> {
    const result: IFile[] = []

    for (const file of array) {
      const xml = await TruckXML.from(file)

      if (!xml?.exists()) {
        continue
      }

      if ((category === Category.trailers && xml.Type === TruckFileType.trailer)
        || (category === Category.trucks && xml.Type !== TruckFileType.trailer)
      ) {
        result.push(file)
      }
    }

    return result.filter(Boolean)
  }

  private async getList(category: Category, from?: SourceType): Promise<IFile[]> {
    if (from === SourceType.dlc) {
      const array: IFile[] = []

      for (const dlc of DLCs) {
        const classes = dlc.dir.dir('classes')

        if (category === Category.trucks) {
          array
            .push(...await classes.dir('trucks')
            .findFiles({ ext: 'xml' }))
        } else if (category === Category.trailers) {
          array
            .push(...await classes.dir('trucks/trailers')
            .findFiles({ ext: 'xml' }))
        }
      }

      return array
    }

    if (from === SourceType.mods) {
      const array: IFile[] = []

      for (const mod of Mods) {
        const modClasses = Dirs.modsTemp.dir(mod.name, 'classes')

        if (category === Category.trucks) {
          array
            .push(...await modClasses.dir('trucks')
            .findFiles({ ext: 'xml' }))
        } else if (category === Category.trailers) {
          const files = await modClasses.dir('trucks').findFiles({ ext: 'xml', recursive: true })

          for (const file of files) {
            const xml = await TruckXML.from(file)

            if (xml && xml.Type === TruckFileType.trailer) {
              array.push(file)
            }
          }
        }
      }

      return array
    }

    if (category === Category.trucks) {
      return Dirs.classes.dir('trucks').findFiles({ ext: 'xml' })
    }

    if (category === Category.trailers) {
      return Dirs.classes.dir('trucks/trailers').findFiles({ ext: 'xml' })
    }

    return []
  }
}

export default new ItemsUtils()
