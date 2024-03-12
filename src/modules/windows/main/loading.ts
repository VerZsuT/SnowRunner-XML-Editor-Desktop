import { app, type BrowserWindow } from 'electron'

import type { IDownloadWindow } from '/mods/updates/types'

import { publicMainEvent } from 'emr-bridge'

import { ProgramWindow, WindowType } from '../enums'
import { PubKeys } from '../public'
import { getDevPage, getRenderer, newWindow } from './utils'

/** Вызвать событие текста */
const emitSetText = publicMainEvent<string>(PubKeys.loadingTextEvent)
/** Вызвать событие процента */
const emitSetPercent = publicMainEvent<string | number>(PubKeys.loadingPercentEvent)
/** Вызвать событие успеха */
const emitSetSuccess = publicMainEvent<boolean>(PubKeys.loadingSuccessEvent)
/** Вызвать событие загрузки */
const emitSetDownload = publicMainEvent<boolean>(PubKeys.loadingDownloadEvent)

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

    win.setText = emitSetText
    win.setPercent = emitSetPercent
    win.success = () => emitSetSuccess(true)
    win.download = () => emitSetDownload(true)
    win.showAndWait = () => new Promise<void>(resolve => {
      win.show()
      setTimeout(resolve, 100)
    })

    return win
  },

  onClose() {
    app.quit()
  }
})
