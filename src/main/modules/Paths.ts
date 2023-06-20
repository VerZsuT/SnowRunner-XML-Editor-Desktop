import { resolve as res } from 'path'

import { Access, publicProperty } from 'emr-bridge'

import type { IPaths } from '#g/types'

/** Пути, используемые в программе (в собранном виде) */
class Paths {
  private static readonly UPDATER_URL = 'https://verzsut.github.io/sxmle_updater'
  private static readonly REPOS_URL = 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop'

  @publicProperty({
    name: 'paths',
    access: Access.get
  })
  private static readonly obj: IPaths = {
    /** URL json файла обновления */
    publicInfo: `${this.UPDATER_URL}/public.json`,

    /** URL страницы скачивания программы */
    downloadPage: `${this.REPOS_URL}/download.html`,

    /** URL папки с файлами обновления */
    updateFiles: `${this.UPDATER_URL}/files`,

    /** URL папки с файлами обновления (legacy) */
    updateLegacyFiles: `${this.UPDATER_URL}/files_legacy`,

    /** URL с hash-картой файлов обновления */
    updateMap: `${this.UPDATER_URL}/updateMap.json`,

    /** URL с hash-картой файлов обновления */
    updateMapLegacy: `${this.UPDATER_URL}/updateMap_legacy.json`,

    /** Папка `app` */
    root: this.resolve('../../'),

    /** Папка `updateRoot` */
    updateRoot: this.resolve('../../../updateRoot'),

    /** Папка с бэкапами (при обновлении) */
    updateBackupFolder: this.resolve('../../../updateRoot/.webpack/main/backups'),

    /** `config.json` */
    config: this.resolve('config.json'),

    /** Файл с переводами игры */
    texts: this.resolve('game_texts.json'),

    /** Папка с бэкапами */
    backupFolder: this.resolve('backups'),

    /** Иконка программы */
    icon: this.resolve('favicon.ico'),

    /** Бэкап `initial.pak` */
    backupInitial: this.resolve('backups/initial.pak'),

    /** Бэкап данных `initail.pak` перед распаковкой */
    backupInitialData: this.resolve('backups/previous_initial'),

    /** Папка `WinRAR` */
    winrar: this.resolve('winrar'),

    /** Временная папка для основных файлов */
    mainTemp: this.resolve('mainTemp'),

    /** Временная папка для файлов модификаций */
    modsTemp: this.resolve('modsTemp'),

    /** Временная папка `[strings]` */
    strings: this.resolve('mainTemp/[strings]'),

    /** Деинсталлятор */
    uninstall: this.resolve('../../../../unins000.exe'),

    /** Временная папка `classes` */
    classes: this.resolve('mainTemp/[media]/classes'),

    /** Временная папка `_dlc` */
    dlc: this.resolve('mainTemp/[media]/_dlc')
  }

  private static resolve(...args: string[]) {
    return res(__dirname, ...args)
  }

  static {
    for (const key in this.obj) {
      Object.defineProperty(this, key, {
        get: () => this.obj[key],
        enumerable: true,
        configurable: false
      })
    }
  }
}

export default Paths as unknown as IPaths
