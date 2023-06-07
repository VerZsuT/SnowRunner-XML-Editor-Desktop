import { PreloadType } from '#g/enums'
import type { IConfigModsItems, IFindItem, IListPreload } from '#g/types'
import { Config, Preload, System } from '#r/services'

export default class ModsService {
  private static readonly preload = Preload.get<IListPreload>(PreloadType.lists)

  static async load(): Promise<IFindItem[]> {
    return this.preload.getMods()
  }

  static async requestMods() {
    const result = await this.preload.getModPaks()
    if (!result) return
    return result.map(item => ({
      ...item,
      id: item.name.replace('.pak', '')
    }))
  }

  static async requestFromFolders() {
    const result = await this.preload.getFromFolders()
    if (!result) return
    return result.map(item => ({
      ...item,
      id: item.name.replace('.pak', '')
    }))
  }

  static save(keys: string[], items: IFindItem[]): void {
    const selected = this.keysToModsItems(keys, items)

    Config.mods = {
      length: keys.length,
      items: selected
    }
  }

  static itemToKeys(items: IFindItem[]): string[] {
    return items.map(item => item.path)
  }

  static keysToModsItems(keys: string[], items: IFindItem[]): IConfigModsItems {
    const out: IConfigModsItems = {}

    keys.forEach(key => {
      Object.values(items).forEach(item => {
        if (item.path === key) {
          out[System.basename(item.path, '.pak')] = {
            name: System.basename(item.path),
            path: item.path
          }
        }
      })
    })

    return out
  }
}
