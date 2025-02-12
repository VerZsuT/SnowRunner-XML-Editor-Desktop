import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { IPaths } from './types'
import { providePublic, publicField } from '/utils/bridge/main'

export type * from './types'

/** Папка, в которой находится текущий исполняемый скрипт */
const _dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Пути, используемые в программе (в собранном виде)  
 * _main process_
*/
@providePublic()
class Paths {
  /** URL для обновления */
  private readonly updaterURL = 'https://verzsut.github.io/sxmle_updater'
  /** URL репозитория */
  private readonly ioReposURL = 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop'

  /** Объект путей */
  @publicField()
  private accessor object: IPaths = {
    publicInfo: `${this.updaterURL}/public.json`,
    downloadPage: `${this.ioReposURL}/download.html`,
    update: `${this.updaterURL}/update/`,
    
    root: this.resolve('../../'),
    pages: this.resolve('../renderer/src/renderer/pages'),

    config: this.json('config'),
    edited: this.json('edited'),
    favorites: this.json('favorites'),
    mods: this.json('mods'),
    sizes: this.json('sizes'),
    texts: this.json('game-texts'),
    exported: this.json('exported'),

    backupFolder: this.resolve('backups'),
    backupInitial: this.resolve('backups/initial.pak'),
    backupInitialData: this.resolve('backups/previous_initial'),
    icon: this.resolve('../favicon.ico'),
    winrar: this.resolve('winrar'),
    mainTemp: this.resolve('mainTemp'),
    modsTemp: this.resolve('modsTemp'),
    updateTemp: this.resolve('updateTemp'),
    strings: this.resolve('mainTemp/[strings]'),
    uninstall: this.resolve('../../../../unins000.exe'),
    classes: this.resolve('mainTemp/[media]/classes'),
    templates: this.resolve('mainTemp/[media]/_templates'),
    dlc: this.resolve('mainTemp/[media]/_dlc')
  }

  /**
   * Инициализация класса  
   * __НЕ ИСПОЛЬЗОВАТЬ__
  */
  _init() {
    for (const key in this.object) {
      Object.defineProperty(this, key, {
        get: () => (this.object[key]),
        enumerable: true,
        configurable: false
      })
    }

    return this
  }

  /** Получить объект путей */
  get() { return { ...this.object } }

  /** Обработать путь относительно текущей папки */
  private resolve(...paths: string[]) {
    return join(_dirname, ...paths)
  }

  /** Путь до json файла */
  private json(name: string): string {
    return this.resolve(`jsons/${name}.json`)
  }

}

export default (new Paths()._init()) as Paths & IPaths
