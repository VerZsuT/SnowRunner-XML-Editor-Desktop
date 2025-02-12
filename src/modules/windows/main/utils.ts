import type { BrowserWindow } from 'electron'
import { WindowType } from '../enums'
import type { WindowParams } from '../types'
import type Windows from './index'
import { Dirs } from '/mods/files/main'

/** Создать новый объект окна программы */
export function newWindow<T extends BrowserWindow = BrowserWindow>(params: WindowParams<T>) {
  return new ProgramWin<T>(params)
}

/** Получить путь к html */
export function getRenderer(path: string) {
  return Dirs.pages.file(path).path
}

/** Получить путь к dev странице */
export function getDevPage(name: string) {
  return `${RENDERER_VITE_DEV_SERVER_URL}/src/renderer/pages/${name}/index.html`
}

/** Класс объекта окна программы */
export class ProgramWin<T extends BrowserWindow = BrowserWindow> {
  constructor(
    readonly params: WindowParams<T>
  ) {}

  /** Зарегистрировать окно */
  register(windows: typeof Windows) {
    const superCreate = this.params.windowType === WindowType.default
      ? () => windows.createWindow(this.params) as Promise<T>
      : () => windows.createModalWindow(this.params) as Promise<T>
      
    windows.regWindow<T>(this.params, async (...args: any[]) => {
      const create = this.params.create || superCreate
      const window = await create(superCreate, ...args)

      if (this.params.onClose) {
        window.once('close', () => this.params.onClose?.(window, windows))
      }

      await this.params.onCreated?.(window, windows)
      
      return window
    })
  }
}
