import { app, ipcMain } from 'electron'

import ProgramWindow from './ProgramWindow'

import { IPCChannel, ProgramWindow as ProgramWindowEnum } from '#g/enums'
import Entries from '#m/modules/Entries'
import Windows from '#m/modules/Windows'

class MainWindow extends ProgramWindow {
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

  protected onClose(): void {
    app.quit()
  }

  protected onFocus(): void {
    Windows.loading?.hide()
  }

  private onWindowResize = (): void => {
    this.wind?.on('resize', () => {
      this.wind?.webContents.send(IPCChannel.windowResize)
    })
  }
}

new MainWindow().register()
