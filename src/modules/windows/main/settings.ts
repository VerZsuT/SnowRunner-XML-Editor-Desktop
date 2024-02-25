import { ProgramWindow, WindowType } from '../enums'
import { getDevPage, getRenderer, newWindow } from './utils'

/** Окно настроек */
export default newWindow({
  windowType: WindowType.modal,
  name: ProgramWindow.settings,
  path: getRenderer('settings/index.html'),
  devURL: getDevPage('settings'),
  width: 400,
  minWidth: 400,
  height: 330,
  minHeight: 350
})
