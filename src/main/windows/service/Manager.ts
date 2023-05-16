import type { BrowserWindow } from 'electron'

import { publicMethod } from 'emr-bridge'

import type { ProgramWindow } from '#g/enums'

type WindowsObject = Record<keyof ProgramWindow, WindowCreator>
type WindowCreator = (...args: any[]) => Promise<BrowserWindow>

class ManagerClass {
  private windows = <WindowsObject>{}

  register(window: ProgramWindow, creator: WindowCreator): void {
    this.windows[window] = creator
  }

  @publicMethod('openWindow')
  async open(window: ProgramWindow, ...args: any[]): Promise<void> {
    const wind = await this.getCreator(window)(...args)
    await new Promise(resolve => {
      wind.once('show', resolve)
    })
  }

  private getCreator(window: ProgramWindow): WindowCreator | never {
    const creator = this.windows[window]
    if (!creator) {
      throw new Error(`Window creator for '${window}' is not defined`)
    }

    return creator
  }
}

const Manager = new ManagerClass()

export default Manager
