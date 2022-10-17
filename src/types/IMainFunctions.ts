import type { app, shell } from 'electron'

import type { archive, backup, checks, config, dialogs, epf, helpers, rendererPublic, updates } from '#classes'
import type { windowsManager } from '#windows'

export interface IMainFunctions {
  updateFiles: typeof rendererPublic.updateFiles
  runUninstall: typeof rendererPublic.uninstall
  unpack: typeof archive.syncUnpack

  findInDir: typeof helpers.findInDir
  joinEPF: typeof epf.join
  seeEPF: typeof epf.see
  relaunchApp: typeof app.relaunch
  quitApp: typeof app.quit
  importConfig: typeof config.import
  exportConfig: typeof config.export
  openPath: typeof shell.openPath
  openLink: typeof shell.openExternal

  openWindow: typeof windowsManager.open
  getDir: typeof dialogs.getDir
  getXML: typeof dialogs.getXML
  getInitial: typeof dialogs.getInitial
  getEPF: typeof dialogs.getEPF
  saveEPF: typeof dialogs.saveEPF

  saveBackup: typeof backup.save
  copyBackup: typeof backup.copy
  recoverFromBackup: typeof backup.recoverFromIt
  resetConfig: typeof config.reset
  checkUpdate: typeof checks.checkUpdate
  updateApp: typeof updates.update
  unpackMain: typeof archive.unpackMain
  devTools: typeof rendererPublic.devTools
}
