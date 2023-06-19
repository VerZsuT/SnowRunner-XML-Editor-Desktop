import type { BrowserWindow } from 'electron'

import { publicMethod } from 'emr-bridge'

import { ProgramWindow } from '#g/enums'

type WindowsObject = Record<keyof ProgramWindow, WindowCreator>
type WindowCreator = (...args: any[]) => Promise<BrowserWindow>

export default class Manager {
  private static windows = {} as WindowsObject

  private static _mainWindow?: BrowserWindow
  static get mainWindow(): BrowserWindow | undefined {
    if (!this._mainWindow || this._mainWindow.isDestroyed()) return undefined
    return this._mainWindow
  }

  private static _setupWindow?: BrowserWindow
  static get setupWindow(): BrowserWindow | undefined {
    if (!this._setupWindow || this._setupWindow.isDestroyed()) return undefined
    return this._setupWindow
  }

  static register(window: ProgramWindow, creator: WindowCreator): void {
    this.windows[window] = creator
  }

  @publicMethod('openWindow')
  static async open(window: ProgramWindow, ...args: any[]): Promise<void> {
    const wind = await this.getCreator(window)(...args)
    if (window === ProgramWindow.Main) this._mainWindow = wind
    if (window === ProgramWindow.Setup) this._setupWindow = wind

    await new Promise(resolve => {
      wind.once('show', resolve)
    })
  }

  private static getCreator(window: ProgramWindow): WindowCreator | never {
    const creator = this.windows[window]
    if (!creator) {
      throw new Error(`Window creator for '${window}' is not defined`)
    }

    return creator
  }
}
