import type { BrowserWindow } from 'electron'
import { WindowType } from '../enums'
import type { WindowParams } from '../types'
import type Windows from './index'
import { Dirs } from '/mods/files/main'

/**
 * Создать новый объект окна программы.
 * @param params Параметры окна.
 * @returns Объект окна программы.
 */
export function newWindow<T extends BrowserWindow = BrowserWindow>(params: WindowParams<T>) {
  return new ProgramWin<T>(params)
}

/**
 * Получить путь к html файлу.
 * @param path Путь в папке `pages`.
 * @returns Путь к html файлу.
 */
export function getRenderer(path: string) {
  return Dirs.pages.file(path).path
}

/**
 * Получить путь к dev странице.
 * @param name Название страницы.
 */
export function getDevPage(name: string) {
  return `${RENDERER_VITE_DEV_SERVER_URL}/src/renderer/pages/${name}/index.html`
}

/** Объект окна программы. */
export class ProgramWin<T extends BrowserWindow = BrowserWindow> {
  constructor(
    readonly params: WindowParams<T>
  ) {}

  /**
   * Зарегистрировать окно.
   * @param windows Объект окон программы.
   */
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
