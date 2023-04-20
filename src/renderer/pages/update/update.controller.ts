import type UpdateWindowModel from './update.model'

import { ProgramWindow } from '#g/enums'
import { handleLocale, windowReady } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import bridge from '#r/scripts/bridge'
import { config, ipc } from '#r/services'

const { settings } = config

class UpdateWindowController extends ViewController<{}, UpdateWindowModel> {
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
    bridge.updateApp()
  }

  ignoreUpdate = (): void => {
    settings.updates = false
    window.close()
  }

  private handleIPC(): void {
    ipc.on('content', (_event, data) => this.model.version = data)
  }
}

export default UpdateWindowController
