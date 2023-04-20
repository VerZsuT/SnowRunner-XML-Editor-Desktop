import type LoadingModel from './loading.model'

import { ProgramWindow } from '#g/enums'
import { handleLocale, windowReady } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import { ipc } from '#r/services'

class LoadingController extends ViewController<{}, LoadingModel> {
  constructor(model: LoadingModel) {
    super({}, model)
    this.useIPC()
    windowReady(ProgramWindow.Loading)
    handleLocale()
  }

  private useIPC(): void {
    ipc.on('success', () => {
      this.model.percent = 0
      this.model.loadedCount++
    })
    ipc.on('download', () => this.model.isDownload = true)
    ipc.on('fileName', (_, title) => this.model.title = title)
    ipc.on('percent', (_, percent) => this.model.percent = percent)
    ipc.on('count', (_, allCount) => this.model.allCount = allCount)
  }
}

export default LoadingController
