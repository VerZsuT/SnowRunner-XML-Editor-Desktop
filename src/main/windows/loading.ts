import type { BrowserWindow } from 'electron'

import ModalWindow from './service/ModalWindow'

import { ProgramWindow } from '#g/enums'
import type { IDownloadWindow } from '#g/types'
import Entries from '#m/modules/Entries'
import Windows from '#m/modules/Windows'

class LoadingWindow extends ModalWindow {
  protected type = ProgramWindow.Loading
  protected args = {
    path: Entries.general.loading,
    preload: Entries.preload.loading,
    width: 280,
    minWidth: 280,
    height: 130,
    minHeight: 150,
    frame: false
  }

  protected async creator(...args: any[]): Promise<BrowserWindow> {
    return this.initMethods(await super.creator(...args))
  }

  protected onCreate(): void {
    Windows.loading = this.wind as IDownloadWindow
  }

  private initMethods(window: BrowserWindow): IDownloadWindow {
    const loadingWindow = window as IDownloadWindow

    function postMessage(channel: string, arg: any): void {
      loadingWindow.webContents.postMessage(channel, arg)
    }

    loadingWindow.setText = (text: string) => postMessage('fileName', text)
    loadingWindow.setCount = (count: number) => postMessage('count', count)
    loadingWindow.setPercent = (percent: string | number) => postMessage('percent', percent)
    loadingWindow.success = () => postMessage('success', true)
    loadingWindow.download = () => postMessage('download', true)
    loadingWindow.showAndWait = () => new Promise<void>(resolve => {
      loadingWindow.show()
      setTimeout(resolve, 100)
    })

    return loadingWindow
  }
}

new LoadingWindow().register()
