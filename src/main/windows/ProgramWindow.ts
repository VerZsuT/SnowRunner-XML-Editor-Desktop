import type { BrowserWindow } from 'electron'

import type { ProgramWindow as ProgramWindowEnum } from '#g/enums'
import { IPCChannel } from '#g/enums'
import type { ICreateWindowAttributes } from '#g/types'
import Config from '#m/modules/Config'
import Windows from '#m/modules/Windows'
import Manager from '#m/windows/service/Manager'

abstract class ProgramWindow {
  protected abstract readonly args: Omit<ICreateWindowAttributes, 'type'>
  protected abstract readonly type: ProgramWindowEnum
  protected wind?: BrowserWindow

  public register(): void {
    Manager.register(this.type, (...args: any[]) => this.create(...args))
  }

  private async create(...args: any[]): Promise<BrowserWindow> {
    this.wind = await this.creator(...args)

    Config.addChangeHandler(this.onConfigChange)
    this.wind.once('close', () => this.removeChangeHandler())

    this.wind.once('close', () => this.onClose(...args))
    this.wind.once('focus', () => this.onFocus(...args))
    this.wind.once('show', () => this.onShow(...args))

    await this.onCreate(...args)
    return this.wind
  }

  protected async creator(...args: any[]): Promise<BrowserWindow> {
    return Windows.create({ ...this.args, type: this.type })
  }

  protected onCreate(...args: any[]): Promise<void> | void { }
  protected onFocus(...args: any[]): void { }
  protected onClose(...args: any[]): void { }
  protected onShow(...args: any[]): void { }

  private onConfigChange = () => {
    this.wind?.webContents.send(IPCChannel.changeConfig)
  }

  private removeChangeHandler() {
    Config.removeChangeHandler(this.onConfigChange)
  }
}

export default ProgramWindow
