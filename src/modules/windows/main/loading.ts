import { app, type BrowserWindow } from 'electron'

import type { IDownloadWindow } from '/mods/updates/types'

import { publicMainEvent } from 'emr-bridge'

import { ProgramWindow, WindowType } from '../enums'
import { Keys } from '../public'
import { getDevPage, getRenderer, newWindow } from './utils'

const emitSetFileName = publicMainEvent<string>(Keys.loadingTextEvent)
const emitSetPercent = publicMainEvent<string | number>(Keys.loadingPercentEvent)
const emitSetSuccess = publicMainEvent<boolean>(Keys.loadingSuccessEvent)
const emitSetDownload = publicMainEvent<boolean>(Keys.loadingDownloadEvent)

/** Окно загрузки */
export default newWindow({
  windowType: WindowType.modal,
  name: ProgramWindow.loading,
  path: getRenderer('loading/index.html'),
  devURL: getDevPage('loading'),
  width: 280,
  minWidth: 280,
  height: 170,
  minHeight: 170,

  async create(superCreate): Promise<BrowserWindow> {
    const win = await superCreate() as IDownloadWindow

    win.setText = emitSetFileName
    win.setPercent = emitSetPercent
    win.success = () => emitSetSuccess(true)
    win.download = () => emitSetDownload(true)
    win.showAndWait = () => new Promise<void>(resolve => {
      win.show()
      setTimeout(resolve, 100)
    })

    return win
  },
  onClose() { app.quit() }
})
