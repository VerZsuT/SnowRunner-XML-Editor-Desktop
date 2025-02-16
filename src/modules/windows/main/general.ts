import { emitEvent } from 'emr-bridge/main'
import { ProgramWindow, WindowType } from '../enums'
import { PubKeys } from '../public'
import type { IGeneralWindow } from '../types'
import { getDevPage, getRenderer, newWindow } from './utils'

/** Главное окно программы. */
export default newWindow<IGeneralWindow>({
  windowType: WindowType.default,
  name: ProgramWindow.general,
  path: getRenderer('general/index.html'),
  devURL: getDevPage('general'),
  width: 800,
  height: 630,
  minWidth: 800,
  minHeight: 630,

  async create(superCreate) {
    const win = await superCreate()

    win.route = page => emitEvent(PubKeys.routeEvent, page)

    return win
  }
})
