import { app } from 'electron'

import { ProgramWindow, WindowType } from '../enums'
import { getDevPage, getRenderer, newWindow } from './utils'

/** Главное окно программы */
export default newWindow({
  windowType: WindowType.default,
  name: ProgramWindow.main,
  path: getRenderer('main/index.html'),
  devURL: getDevPage('main'),
  width: 840,
  minWidth: 800,
  height: 700,
  minHeight: 630,

  onClose() { app.quit() },
  onShow(_, Manager) { Manager.loadingWindow?.hide() }
})
