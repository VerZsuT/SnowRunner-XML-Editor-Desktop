import type { BrowserWindow } from 'electron'

import { publicMainEvent } from 'emr-bridge'

import { ProgramWindow, WindowType } from '../enums'
import { PubKeys } from '../public'
import { getDevPage, getRenderer, newWindow } from './utils'

import type { IUpdateWindow } from '/mods/updates/types'

/** Вызвать событие контента */
const emitContentEvent = publicMainEvent<string>(PubKeys.updateContentEvent)

/** Окно обновления программы */
export default newWindow({
  windowType: WindowType.modal,
  name: ProgramWindow.update,
  path: getRenderer('update/index.html'),
  devURL: getDevPage('update'),
  width: 450,
  minWidth: 400,
  height: 200,
  minHeight: 180,

  async create(superCreate): Promise<BrowserWindow> {
    const win = await superCreate() as IUpdateWindow
    win.setVersion = emitContentEvent
    return win
  }
})
