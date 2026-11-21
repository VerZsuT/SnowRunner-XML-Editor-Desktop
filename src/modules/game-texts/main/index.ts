import { makeReactive } from '@bridge/main'
import { Lang } from '@modules/data/config/enums'
import type { IConfig } from '@modules/data/config/types'
import type { IMainDirs as IDirs, IMainWatcher } from '@modules/files/main'
import { di, inject } from '@utilities/di/container'
import { ARCHIVER_TOKEN, CONFIG_TOKEN, DIRS_TOKEN, MODS_TOKEN } from '@utilities/di/main/tokens'
import type { IGameTexts, IMainGameTexts, ITranslation } from '../types'

/** Работа с игровой локализацией. [main] */
export class GameTexts implements IMainGameTexts {
	/** Явное имя сущности в мосте. */
	static readonly pubName = 'GameTexts'
	/** Конфигурация программы. */
	@inject(CONFIG_TOKEN)
	private readonly config!: IConfig

	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: IDirs

	/** Название файлов локализаций игры для каждого языка. */
	private readonly locals: Record<Lang, string> = {
		[Lang.ru]: 'russian',
		[Lang.en]: 'english',
		[Lang.de]: 'german',
		[Lang.ch]: 'chinese_simplified'
	}

	accessor object: IGameTexts = {
		mods: {},
		main: {}
	}

	/** Наблюдатель за файлом перевода. */
	private watcher?: IMainWatcher

	/** Таймер повторной подписки на файл перевода. */
	private watcherRetry?: NodeJS.Timeout

	constructor() {
		makeReactive(this, 'object')
	}

	async initFromInitial() {
		this.watcher?.close()
		this.watcher = undefined
		clearTimeout(this.watcherRetry)
		this.watcherRetry = undefined

		if (!await this.dirs.strings.exists()) {
			return
		}

		const archiver = di.resolve(ARCHIVER_TOKEN)
		const stringsFile = this.dirs.strings.file(`strings_${this.locals[this.config.lang]}.str`)
		const parse = async () => {
			try {
				await archiver.isInitialUnpacking

				if (await stringsFile.exists()) {
					this.set({ main: this.parseFile(await stringsFile.read('utf16le')) })
				}
			} catch (error: any) {
				console.error(error)
			}
		}

		if (!await stringsFile.exists()) {
			return
		}

		const watchAndParse = async () => {
			try {
				await archiver.isInitialUnpacking
				this.watcher?.close()
				this.watcher = stringsFile.watch(parse)
				this.watcher.on('error', async (error: Error) => {
					console.error(error)
					this.watcher?.close()
					this.watcher = undefined

					// Файл могли заменить во время распаковки — пробуем подписаться снова.
					if (!this.watcherRetry && await stringsFile.exists()) {
						this.watcherRetry = setTimeout(() => {
							this.watcherRetry = undefined
							void watchAndParse()
						}, 1000)
					}
				})
				await parse()
			} catch (error: any) {
				console.error(error)
			}
		}

		await watchAndParse()
	}

	async initFromMods() {
		const mods = di.resolve(MODS_TOKEN)
		const result: IGameTexts['mods'] = Object.create(null)

		for (const mod of mods) {
			if (!await this.dirs.modsTemp.dir(mod.name, 'texts').exists()) {
				continue
			}

			const stringsFile = this.dirs.modsTemp.file(mod.name, `texts/strings_${this.locals[this.config.lang]}.str`)

			if (!await stringsFile.exists()) {
				continue
			}

			result[mod.name] = this.parseFile(await stringsFile.read('utf16le'))
		}

		this.set({ mods: result })
	}

	/**
	 * Обработать файл игрового перевода.
	 * @param data Содержимое файла.
	 * @returns Игровой перевод.
	 */
	private parseFile(data: string): ITranslation {
		// null-prototype защищает от изменения прототипа ключами вида `__proto__`.
		const strings: ITranslation = Object.create(null)
		const lines = String(data ?? '').match(/[^\n\r]+/g)

		if (!lines) {
			return strings
		}

		for (const line of lines) {
			const result = line.split('"')

			if (!result || result.length <= 1) {
				continue
			}

			let [key, value] = line.split('"')

			if (!key || !value) {
				continue
			}

			key = key
				.trimEnd()
				.replaceAll('"', '')
				.replaceAll('\'', '')
				.replaceAll('﻿', '')
			value = value
				.replaceAll('\\', '')

			try {
				strings[key] = value
			} catch {}
		}

		return strings
	}

	/**
	 * Установить объект перевода.
	 * @param newObject Новый объект.
	 */
	private set(newObject: Partial<IGameTexts>) {
		this.object = {
			...this.object,
			...newObject
		}
	}
}
