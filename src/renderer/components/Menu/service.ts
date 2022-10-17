import { Bridge } from 'emr-bridge/renderer'

import { config, system, xml } from '#services'
import type { IFindItem, IMPC } from '#types'

class MenuService {
  private readonly bridge = Bridge.as<IMPC>()
  private readonly paths = this.bridge.paths

  exportDefaults(): void {
    const items: IFindItem[] = []
    const exported: any = {}
    const postfixes = [
      'trucks',
      'trucks/trailers',
      'gearboxes',
      'engines',
      'suspensions',
      'winches',
      'wheels'
    ]

    for (const dlcItem of config.dlc) {
      const path = `${dlcItem.path}\\classes`
      postfixes.forEach(postfix => {
        items.push(...this.bridge.findInDir(system.join(path, postfix)))
      })
    }

    postfixes.forEach(postfix => {
      items.push(...this.bridge.findInDir(system.join(this.paths.classes, postfix)))
    })

    for (const item of items) {
      const fileName = `${item.name}.xml`
      const obj = xml.exportToObject({ filePath: item.path })
      if (!obj) continue
      exported[fileName] = obj.data[fileName]
    }

    system.writeFileSync(system.join(this.paths.backupFolder, 'exported.json'), JSON.stringify(exported, null, '\t'))
  }
}

export const menuService = new MenuService()
