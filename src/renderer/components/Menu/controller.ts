import type MenuModel from './model'

import { ProgramWindow } from '#enums'
import bridge from '#r-scripts/bridge'
import { config, system, xml } from '#services'
import type { IFindItem } from '#types'

const paths = bridge.paths

class MenuController {
  constructor(
    private m: MenuModel
  ) {}

  exportDefaults = () => {
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
        bridge.importConfig
        items.push(...bridge.findInDir(system.join(path, postfix)))
      })
    }

    postfixes.forEach(postfix => {
      items.push(...bridge.findInDir(system.join(paths.classes, postfix)))
    })

    for (const item of items) {
      const fileName = `${item.name}.xml`
      const obj = xml.exportToObject({ filePath: item.path })
      if (!obj || !obj.fileName) continue
      exported[fileName] = obj.data[fileName]
    }

    system.writeFileSync(system.join(paths.backupFolder, 'exported.json'), JSON.stringify(exported, null, '\t'))
  }

  quitApp = () => {
    bridge.quitApp()
  }

  openModio = () => {
    bridge.openLink(this.m.MOD_IO_LINK)
  }

  openGithub = () => {
    bridge.openLink(this.m.GITHUB_LINK)
  }

  openYoutube = () => {
    bridge.openLink(this.m.YOUTUBE_LINK)
  }

  openBackupFolder = () => {
    bridge.openPath(paths.backupFolder)
  }

  openSettings = () => {
    bridge.openWindow(ProgramWindow.Settings)
  }

  showWhatsNew = () => {
    bridge.openWindow(ProgramWindow.WhatsNew)
  }

  saveBackup = () => {
    bridge.copyBackup()
  }

  restoreBackup = () => {
    bridge.recoverFromBackup()
  }

  resetConfig = () => {
    bridge.resetConfig()
  }

  uninstall = () => {
    bridge.runUninstall()
  }
}

export default MenuController
