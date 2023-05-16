import { PreloadType } from '#g/enums'
import type { IConfigModsItems, IFindItem, IListPreload } from '#g/types'
import { config, preload, system } from '#r/services'

const { findMods, getModPak } = preload.get<IListPreload>(PreloadType.lists)

class ModsService {
  async load(): Promise<IFindItem[]> {
    return findMods()
  }

  requestMod() {
    const result = getModPak()
    if (!result) return
    return {
      ...result,
      id: result.name.replace('.pak', '')
    }
  }

  save(keys: string[], items: IFindItem[]): void {
    const selected = this.keysToModsItems(keys, items)

    config.mods = {
      length: keys.length,
      items: selected
    }
  }

  itemToKeys(items: IFindItem[]): string[] {
    return items.map(item => item.path)
  }

  keysToModsItems(keys: string[], items: IFindItem[]): IConfigModsItems {
    const out: IConfigModsItems = {}

    keys.forEach(key => {
      Object.values(items).forEach(item => {
        if (item.path === key) {
          out[system.basename(item.path, '.pak')] = {
            name: system.basename(item.path),
            path: item.path
          }
        }
      })
    })

    return out
  }
}

const mods = new ModsService()

export default mods
