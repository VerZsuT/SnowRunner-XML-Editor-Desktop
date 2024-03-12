import Config from '/mods/data/config/main'

import { ProgramWindow, WindowType } from '../enums'
import { getDevPage, getRenderer, newWindow } from './utils'

/** Окно "что нового" */
export default newWindow({
  windowType: WindowType.modal,
  name: ProgramWindow.whatsNew,
  path: getRenderer('whats-new/index.html'),
  devURL: getDevPage('whats-new'),
  width: 600,
  minWidth: 600,
  height: 500,
  minHeight: 520,

  onClose() {
    Config.openWhatsNew = false
  }
})
