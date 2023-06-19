import type UpdateWindowModel from './update.model'

import { ProgramWindow } from '#g/enums'
import { handleLocale, windowReady } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import Bridge from '#r/scripts/bridge'
import { Config, IPC } from '#r/services'

export default class UpdateWindowController extends ViewController<{}, UpdateWindowModel> {
  private readonly settings = Config.settings

  constructor(model: UpdateWindowModel) {
    super({}, model)

    windowReady(ProgramWindow.Update)
    handleLocale()
    this.handleIPC()
  }

  closeWindow = (): void => {
    window.close()
  }

  updateProgram = (): void => {
    Bridge.updateApp()
  }

  ignoreUpdate = (): void => {
    this.settings.updates = false
    window.close()
  }

  private handleIPC(): void {
    IPC.on('content', (_event, data) => this.model.version = data)
  }
}
