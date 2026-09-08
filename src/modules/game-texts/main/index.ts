import { makeReactive } from '@bridge/main'
import { Lang } from '@modules/data/config/enums'
import type { IConfig } from '@modules/data/config/types'
import type { IDirs } from '@modules/files/main'
import { di, inject } from '@utilities/di/container'
import { ARCHIVER_TOKEN, CONFIG_TOKEN, DIRS_TOKEN, MODS_TOKEN } from '@utilities/di/main/tokens'
import type { FSWatcher } from 'node:fs'
import type { IGameTexts, IMainGameTexts, ITranslation } from '../types'

/** Работа с игровой локализацией. [main] */
export class GameTexts implements IMainGameTexts {
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

	constructor() {
		makeReactive(this, 'GameTexts', 'object')
	}

	async initFromInitial() {
		if (!await this.dirs.strings.exists()) {
			return
		}

		const archiver = di.resolve(ARCHIVER_TOKEN)
		const stringsFile = this.dirs.strings.file(`strings_${this.locals[this.config.lang]}.str`)
		const parse = async () => {
				await archiver.isInitialUnpacking

				if (await stringsFile.exists()) {
					this.set({ main: this.parseFile(await stringsFile.read('utf16le')) })
				}
		}

		if (!await stringsFile.exists()) {
			return
		}

		let watcher: FSWatcher | undefined

		const watchAndParse = async () => {
			try {
				await archiver.isInitialUnpacking
				watcher?.close()
				watcher = stringsFile.watch(parse).on('error', watchAndParse)
				await parse()
			} catch {}
		}

		await watchAndParse()
	}

	async initFromMods() {
		const mods = di.resolve(MODS_TOKEN)
		const result: IGameTexts['mods'] = {}

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
		const strings = {}
		const lines = data.match(/[^\n\r]+/g)

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
