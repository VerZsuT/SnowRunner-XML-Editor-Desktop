import { app, ipcMain } from 'electron'

import ProgramWindow from './ProgramWindow'
import Manager from './service/Manager'

import { IPCChannel, ProgramWindow as ProgramWindowEnum } from '#g/enums'
import Archive from '#m/modules/Archive'
import Entries from '#m/modules/Entries'
import Windows from '#m/modules/Windows'

class MainWindow extends ProgramWindow {
  private sendingResize = false

  protected type = ProgramWindowEnum.Main
  protected args = {
    path: Entries.general.main,
    preload: Entries.preload.main,
    width: 840,
    minWidth: 800,
    height: 700,
    minHeight: 630
  }

  protected onCreate(): void {
    ipcMain.once(IPCChannel.handleWindowSize, this.onWindowResize)
  }

  protected onShow(): void {
    if (Archive.canRestoreChanges) {
      Manager.mainWindow?.webContents.send(IPCChannel.updateInitial)
    }
  }

  protected onClose(): void {
    app.quit()
  }

  protected onFocus(): void {
    Windows.loading?.hide()
  }

  private onWindowResize = (): void => {
    this.wind?.on('resize', () => {
      if (this.sendingResize) return
      this.sendingResize = true
      setTimeout(() => {
        this.sendingResize = false
        this.wind?.webContents.send(IPCChannel.windowResize)
      }, 500)
    })
  }
}

new MainWindow().register()
