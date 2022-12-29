import type { BrowserWindow } from 'electron'

import { providePublic, publicMethod } from 'emr-bridge'

import type { ProgramWindow } from '#enums'

type WindowsObject = Record<keyof ProgramWindow, WindowCreator>
type WindowCreator = (...args: any[]) => Promise<BrowserWindow>

class Manager {
  private windows = <WindowsObject> {}

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

  private getCreator(window: ProgramWindow): WindowCreator {
    const creator = this.windows[window]
    if (!creator)
      throw new Error(`Window creator for '${window}' is not defined`)

    return creator
  }
}

export default providePublic(new Manager())
