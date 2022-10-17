import { app, ipcMain } from 'electron'

import { Window } from './Window'

import { entries } from '#classes/entries'
import { windows } from '#classes/windows'
import { IPCChannel, ProgramWindow } from '#enums'

class MainWindow extends Window {
  protected type = ProgramWindow.Main
  protected args = {
    path: entries.general.main,
    preload: entries.preload.main,
    width: 840,
    minWidth: 800,
    height: 700,
    minHeight: 630
  }

  constructor() { super(); this.register() }

  protected onCreate(): void {
    ipcMain.once(IPCChannel.handleWindowResize, () => this.onWindowResize())

    this.wind?.once('close', () => this.onClose())
    this.wind?.once('focus', () => this.onFocus())
  }

  private onWindowResize(): void {
    this.wind?.on('resize', () => {
      this.wind?.webContents.send(IPCChannel.windowResize)
    })
  }

  private onClose(): void {
    app.quit()
  }

  private onFocus(): void {
    windows.loading?.hide()
  }
}

new MainWindow()
