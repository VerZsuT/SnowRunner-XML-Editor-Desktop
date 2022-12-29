import { PreloadType } from '#enums'
import { config, preload, system } from '#services'
import type { ConfigModsItems, IFindItem, IListPreload } from '#types'

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

  keysToModsItems(keys: string[], items: IFindItem[]): ConfigModsItems {
    const out: ConfigModsItems = {}

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

export default new ModsService()
