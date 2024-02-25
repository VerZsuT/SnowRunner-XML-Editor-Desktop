import { app } from 'electron'

import { ProgramWindow, WindowType } from '../enums'
import { getDevPage, getRenderer, newWindow } from './utils'

/** Окно первоначальной настройки */
export default newWindow({
  windowType: WindowType.default,
  name: ProgramWindow.setup,
  path: getRenderer('setup/index.html'),
  devURL: getDevPage('setup'),
  width: 620,
  minWidth: 620,
  height: 290,
  minHeight: 310,

  onClose() { app.quit() },
  onShow(_, Manager) { Manager.loadingWindow?.hide() }
})
