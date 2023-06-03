import type MenuModel from './menu.model'

import { ProgramWindow } from '#g/enums'
import type { IFindItem } from '#g/types'
import { handleLocale } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import Bridge from '#r/scripts/bridge'
import { Config, System, XML } from '#r/services'

export default class MenuController extends ViewController<{}, MenuModel> {
  private readonly paths = Bridge.paths

  constructor(model: MenuModel) {
    super({}, model)
    handleLocale()
  }

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

    for (const dlcItem of Config.dlc) {
      const path = `${dlcItem.path}\\classes`
      postfixes.forEach(postfix => {
        Bridge.importConfig
        items.push(...Bridge.findInDir(System.join(path, postfix)))
      })
    }

    postfixes.forEach(postfix => {
      items.push(...Bridge.findInDir(System.join(this.paths.classes, postfix)))
    })

    for (const item of items) {
      const fileName = `${item.name}.xml`
      const obj = XML.exportToObject({ filePath: item.path })
      if (!obj || !obj.fileName) continue
      exported[fileName] = obj.data[fileName]
    }

    System.writeFileSync(System.join(this.paths.backupFolder, 'exported.json'), JSON.stringify(exported, null, '\t'))
  }

  quitApp = () => {
    Bridge.quitApp()
  }

  openModio = () => {
    Bridge.openLink(this.model.MOD_IO_LINK)
  }

  openGithub = () => {
    Bridge.openLink(this.model.GITHUB_LINK)
  }

  openYoutube = () => {
    Bridge.openLink(this.model.YOUTUBE_LINK)
  }

  openBackupFolder = () => {
    Bridge.openPath(this.paths.backupFolder)
  }

  openSettings = () => {
    Bridge.openWindow(ProgramWindow.Settings)
  }

  showWhatsNew = () => {
    Bridge.openWindow(ProgramWindow.WhatsNew)
  }

  saveBackup = () => {
    Bridge.copyBackup()
  }

  restoreBackup = () => {
    Bridge.recoverFromBackup()
  }

  resetConfig = () => {
    Bridge.resetConfig()
  }

  uninstall = () => {
    Bridge.runUninstall()
  }
}
