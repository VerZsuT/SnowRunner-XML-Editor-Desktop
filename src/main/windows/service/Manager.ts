import type { BrowserWindow } from 'electron'

import { publicMethod } from 'emr-bridge'

import type { ProgramWindow } from '#g/enums'

type WindowsObject = Record<keyof ProgramWindow, WindowCreator>
type WindowCreator = (...args: any[]) => Promise<BrowserWindow>

export default class Manager {
  private static windows = {} as WindowsObject

  static register(window: ProgramWindow, creator: WindowCreator): void {
    this.windows[window] = creator
  }

  @publicMethod('openWindow')
  static async open(window: ProgramWindow, ...args: any[]): Promise<void> {
    const wind = await this.getCreator(window)(...args)
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
