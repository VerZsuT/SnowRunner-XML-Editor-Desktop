import { app } from 'electron'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { IMainPathsManager, IPaths } from '../types'
import { migrateLegacyData } from './migration'
import { resolveDataLocation } from './mode'

export type * from '../types'
export type * from './mode'

/** Менеджер путей. [main] */
export class Paths implements IMainPathsManager {
	/** Явное имя сущности в мосте. */
	static readonly pubName = 'Paths'
	/** URL репозитория. */
	private readonly REPOS_URL = 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop'

	/** URL github pages репозитория. */
	private readonly IO_REPOS_URL = 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop'

	/** Папка, в которой находится текущий исполняемый скрипт. */
	private readonly dirname = dirname(fileURLToPath(import.meta.url))

	/** Папка приложения (только чтение). */
	private readonly appRoot = this.resolve('../../')

	/** Режим и каталог данных программы. */
	private readonly location = resolveDataLocation({
		isPackaged: app.isPackaged,
		exePath: app.getPath('exe'),
		userDataPath: app.getPath('userData'),
		exists: path => existsSync(path)
	})

	/** Каталог json файлов программы. */
	private readonly jsonDir = join(this.location.dataRoot, 'jsons')

	/** Миграция данных из папки установки. */
	constructor() {
		migrateLegacyData({
			legacyDir: this.resolve('jsons'),
			dataDir: this.jsonDir
		})
	}

	accessor object: IPaths = Object.freeze({
		publicInfo: `${this.IO_REPOS_URL}/version-info.json`,
		downloadPage: `${this.IO_REPOS_URL}/download.html`,
		update: `${this.REPOS_URL}/releases/download`,
		root: this.appRoot,
		dataRoot: this.location.dataRoot,
		dataMode: this.location.mode,
		pages: this.resolve('../renderer/src/renderer/pages'),
		config: this.json('config'),
		edited: this.json('edited'),
		favorites: this.json('favorites'),
		mods: this.json('mods'),
		sizes: this.json('sizes'),
		texts: this.json('game-texts'),
		exported: this.json('exported'),
		backupFolder: this.data('backups'),
		backupInitial: this.data('backups/initial.pak'),
		backupInitialWithDate: this.getBackupInitialWithDate(),
		backupInitialData: this.data('backups/previous_initial'),
		icon: this.resolve('../favicon.ico'),
		winrar: this.resolve('winrar'),
		mainTemp: this.data('mainTemp'),
		modsTemp: this.data('modsTemp'),
		updateTemp: this.data('updateTemp'),
		strings: this.data('mainTemp/[strings]'),
		uninstall: this.resolve('../../../../unins000.exe'),
		classes: this.data('mainTemp/[media]/classes'),
		templates: this.data('mainTemp/[media]/_templates'),
		dlc: this.data('mainTemp/[media]/_dlc')
	})

	get() {
		return this.object
	}

	/**
	 * Обработать путь относительно папки приложения.
	 * @param paths Пути.
	 * @returns Абсолютный путь.
	 */
	private resolve(...paths: string[]) {
		return join(this.dirname, ...paths)
	}

	/**
	 * Обработать путь относительно каталога данных.
	 * @param paths Пути.
	 * @returns Абсолютный путь.
	 */
	private data(...paths: string[]) {
		return join(this.location.dataRoot, ...paths)
	}

	/**
	 * Получить путь до json файла.
	 * @param name Название файла.
	 * @returns Путь до json файла.
	 */
	private json(name: string): string {
		return join(this.jsonDir, `${name}.json`)
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

	/**
	 * Получить путь к бэкапу с датой-временем.
	 * @returns Путь к бэкапу с датой-временем.
	 */
	private getBackupInitialWithDate() {
		return this.data(`backups/initial_${this.getInitialDateTime()}.pak`)
	}
}
