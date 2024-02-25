import { WindowType } from '../enums'
import type { WindowParams } from '../types'

import type WindowsType from './index'

import { Dirs } from '/mods/files/main'

/** Создать новый объект окна программы */
export function newWindow(params: WindowParams) {
  return new ProgramWin(params)
}

/** Получить путь к html */
export function getRenderer(path: string) { return Dirs.pages.file(path).path }

/** Получить путь к dev странице */
export function getDevPage(name: string) { return `${RENDERER_VITE_DEV_SERVER_URL}/src/renderer/pages/${name}/index.html` }

/** Класс объекта окна программы */
export class ProgramWin {
  constructor(
    readonly params: WindowParams
  ) { false }

  /** Зарегистрировать окно */
  register(Windows: typeof WindowsType) {
    const superCreate = () => Windows.createWindow(this.params)
    const superModalCreate = () => Windows.createModalWindow(this.params)
    this.params.create ??= this.params.windowType === WindowType.default ? superCreate : superModalCreate

    Windows.regWindow(this.params, async (...args: any[]) => {
      const window = await this.params.create!(superCreate, ...args)
      window.once('close', async () => await this.params.onClose?.(window, Windows))
      await this.params.onCreate?.(window, Windows)
      return window
    })
  }
}
