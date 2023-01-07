import type { BrowserWindow } from 'electron'

import ModalWindow from './ModalWindow'

import entries from '#classes/entries'
import windows from '#classes/windows'
import { ProgramWindow } from '#enums'
import type { IDownloadWindow } from '#types'

class LoadingWindow extends ModalWindow {
  protected type = ProgramWindow.Loading
  protected args = {
    path      : entries.general.loading,
    preload   : entries.preload.loading,
    width     : 280,
    minWidth  : 280,
    height    : 130,
    minHeight : 150,
    frame     : false
  }

  constructor() { super(); this.register() }

  protected async creator(...args: any[]): Promise<BrowserWindow> {
    return this.initMethods(await super.creator(...args))
  }

  protected onCreate(): void {
    windows.loading = <IDownloadWindow> this.wind
  }

  private initMethods(window: BrowserWindow): IDownloadWindow {
    const loadingWindow = <IDownloadWindow> window

    function postMessage(channel: string, arg: any): void {
      loadingWindow.webContents.postMessage(channel, arg)
    }

    loadingWindow.setText     = (text: string)  => postMessage('fileName', text)
    loadingWindow.setCount    = (count: number) => postMessage('count', count)
    loadingWindow.setPercent  = (percent: string | number) => postMessage('percent', percent)
    loadingWindow.success     = () => postMessage('success', true)
    loadingWindow.download    = () => postMessage('download', true)
    loadingWindow.showAndWait = () => new Promise<void>(resolve => {
      loadingWindow.show()
      setTimeout(resolve, 100)
    })

    return loadingWindow
  }
}

new LoadingWindow()
