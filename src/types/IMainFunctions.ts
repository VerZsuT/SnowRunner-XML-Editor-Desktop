import type { app, shell } from 'electron'

import type { Archive, Backup, Checks, Config, Dialogs, EPF, Helpers, RendererPublic, Updates } from '#m/modules'
import type { WindowsManager } from '#m/windows'

export default interface IMainFunctions {
  updateFiles: typeof RendererPublic.updateFiles
  runUninstall: typeof RendererPublic.uninstall
  unpack: typeof Archive.publicUnpack

  findInDir: typeof Helpers.findInDir
  joinEPF: typeof EPF.join
  seeEPF: typeof EPF.see
  relaunchApp: typeof app.relaunch
  quitApp: typeof app.quit
  importConfig: typeof Config.import
  exportConfig: typeof Config.export
  openPath: typeof shell.openPath
  openLink: typeof shell.openExternal

  openWindow: typeof WindowsManager.open
  getDir: typeof Dialogs.getDir
  getXML: typeof Dialogs.getXML
  getInitial: typeof Dialogs.getInitial
  getEPF: typeof Dialogs.getEPF
  saveEPF: typeof Dialogs.saveEPF

  saveBackup: typeof Backup.save
  recoverFromBackup: typeof Backup.recoverFromIt
  resetConfig: typeof Config.reset
  checkUpdate: typeof Checks.checkUpdate
  updateApp: typeof Updates.update
  unpackMain: typeof Archive.unpackMain
  devTools: typeof RendererPublic.devTools
}
