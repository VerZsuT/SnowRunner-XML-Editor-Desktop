import type { BrowserWindow } from 'electron'

import { windows } from '#classes/windows'
import type { ProgramWindow } from '#enums'
import type { ICreateWindowAttributes } from '#types'
import { windowsManager } from '#windows/windowsManager'

export abstract class Window {
  protected abstract readonly args: Omit<ICreateWindowAttributes, 'type'>
  protected abstract readonly type: ProgramWindow
  protected wind?: BrowserWindow

  protected register(): void {
    windowsManager.register(this.type, (...args: any[]) => this.create(...args))
  }

  private async create(...args: any[]): Promise<BrowserWindow> {
    this.wind = await this.creator(...args)
    await this.onCreate()
    return this.wind
  }

  protected async creator(...args: any[]): Promise<BrowserWindow> {
    return windows.create({ ...this.args, type: this.type })
  }

  protected onCreate(...args: any[]): Promise<void> | void {}
}
