import type LoadingModel from './loading.model'

import { ProgramWindow } from '#g/enums'
import { handleLocale, windowReady } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import { IPC } from '#r/services'

export default class LoadingController extends ViewController<{}, LoadingModel> {
  constructor(model: LoadingModel) {
    super({}, model)
    this.useIPC()
    windowReady(ProgramWindow.Loading)
    handleLocale()
  }

  private useIPC(): void {
    IPC.on('success', () => {
      this.model.percent = 0
      this.model.loadedCount++
    })
    IPC.on('download', () => this.model.isDownload = true)
    IPC.on('fileName', (_, title) => this.model.title = title)
    IPC.on('percent', (_, percent) => this.model.percent = percent)
    IPC.on('count', (_, allCount) => this.model.allCount = allCount)
  }
}
