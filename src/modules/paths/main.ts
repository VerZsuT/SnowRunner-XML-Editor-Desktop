import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { publicVariable } from 'emr-bridge'

import type { IPublic } from './public'
import { Keys } from './public'
import type { IPaths } from './types'

export type * from './types'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Пути, используемые в программе (в собранном виде)  
 * _main process_
*/
class Paths {
  /** URL для обновления */
  private readonly UPDATER_URL = 'https://verzsut.github.io/sxmle_updater'
  /** URL репозитория */
  private readonly REPOS_IO_URL = 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop'

  /** Объект путей */
  private readonly object: IPaths = {
    publicInfo: `${this.UPDATER_URL}/public.json`,
    downloadPage: `${this.REPOS_IO_URL}/download.html`,
    update: `${this.UPDATER_URL}/update/`,
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

  constructor() { this.initPublic() }

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

  private resolve(...paths: string[]) {
    return join(__dirname, ...paths)
  }

  /** Путь до json файла */
  private json(name: string): string {
    return this.resolve(`jsons/${name}.json`)
  }

  /** Инициализация публичных объектов/методов */
  private initPublic() {
    publicVariable<IPublic[Keys.object]>(Keys.object, {
      get: this.get.bind(this)
    })
  }
}

export default (new Paths()._init()) as Paths & IPaths
