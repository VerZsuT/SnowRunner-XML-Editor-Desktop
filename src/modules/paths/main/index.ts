import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { IPaths } from '../types'

export type * from '../types'

/**
 * Пути, используемые в программе.
 * _main process_
 */
export class Paths {
	/** Папка, в которой находится текущий исполняемый скрипт. */
	private readonly dirname = dirname(fileURLToPath(import.meta.url))

	/** URL репозитория. */
  private readonly reposURL = 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop'

  /** URL github pages репозитория. */
  private readonly ioReposURL = 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop'

  /** Объект путей. */
  public accessor object: IPaths = {
		publicInfo: `${this.ioReposURL}/version-info.json`,
    downloadPage: `${this.ioReposURL}/download.html`,
    update: `${this.reposURL}/releases/download`,
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
    backupInitialWithDate: this.getBackupInitialWithDate(),
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

	constructor() {
		this.init()
	}

  /**
   * Инициализация класса.
   */
  private init() {
    for (const key in this.object) {
      Object.defineProperty(this, key, {
        get: () => (this.object[key]),
        enumerable: true,
        configurable: false
      })
    }
  }

  /**
   * Получить пути.
   * @returns Пути.
   */
  get() {
    return { ...this.object }
  }

	/**
	 * Обработать путь относительно текущей папки.
	 * @param paths Пути.
	 * @returns Абсолютный путь.
	 */
	private resolve(...paths: string[]) {
		return join(this.dirname, ...paths)
	}

	/**
	 * Получить путь до json файла.
	 * @param name Название файла.
	 * @returns Путь до json файла.
	 */
	private json(name: string): string {
		return this.resolve(`jsons/${name}.json`)
	}

	/**
	 * Получить дату-время для initial.pak.
	 * @returns Дата-время.
	 */
	private getInitialDateTime() {
		const date = new Date()
		const dateString = date.toISOString().split('T')[0]
		const timeString = date.toLocaleTimeString().replaceAll(':', '-')

		return `${dateString}_${timeString}`
	}

	private getBackupInitialWithDate() {
		return this.resolve(`backups/initial_${this.getInitialDateTime()}.pak`)
	}
}
