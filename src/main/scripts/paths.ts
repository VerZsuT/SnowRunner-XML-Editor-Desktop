import {resolve as res} from 'path'

import type {Paths} from 'types'

const resolve = (...args: string[]) => res(__dirname, ...args)
const UPDATER_URL = 'https://verzsut.github.io/sxmle_updater'
const REPOS_URL = 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop'

/** Пути, используемые в программе */
export const paths = <Paths> {
    /** URL json файла обновления */
    publicInfo: `${UPDATER_URL}/public.json`,
    /** URL страницы скачивания программы */
    downloadPage: `${REPOS_URL}/download.html`,
    /** URL папки с файлами обновления */
    updateFiles: `${UPDATER_URL}/files`,
    /** URL с hash-картой файлов обновления */
    updateMap: `${UPDATER_URL}/updateMap.json`,
    /** Папка `app` */
    root: resolve('../../'),
    /** Папка `updateRoot` **/
    updateRoot: resolve('../../../updateRoot'),
    /** `config.json` */
    config: resolve('config.json'),
    /** Файл с переводами игры */
    texts: resolve('game_texts.json'),
    /** Папка с бэкапами */
    backupFolder: resolve('backups'),
    /** Иконка программы */
    icon: resolve('favicon.ico'),
    /** Бэкап `initial.pak` */
    backupInitial: resolve('backups/initial.pak'),
    /** Папка `WinRAR` */
    winrar: resolve('winrar'),
    /** Временная папка для основных файлов */
    mainTemp: resolve('mainTemp'),
    /** Временная папка для файлов модификаций */
    modsTemp: resolve('modsTemp'),
    /** Временная папка `[strings]` */
    strings: resolve('mainTemp/[strings]'),
    /** Деинсталлятор */
    uninstall: resolve('../../../../unins000.exe'),
    /** Временная папка `classes` */
    classes: resolve('mainTemp/[media]/classes'),
    /** Временная папка `_dlc` */
    dlc: resolve('mainTemp/[media]/_dlc')
}
