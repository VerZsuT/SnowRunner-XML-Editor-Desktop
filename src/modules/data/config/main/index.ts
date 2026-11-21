import { makeReactive } from '@bridge/main'
import { createAutoSaver } from '@utilities/autosave/main'
import type { IEnv } from '@modules/env/types'
import type { IMainDirs as IDirs } from '@modules/files/main'
import type { IMainSystem } from '@modules/system/types'
import { di, inject } from '@utilities/di/container'
import { APP_CONSTANTS_TOKEN, DIRS_TOKEN, ENV_TOKEN, SYSTEM_TOKEN } from '@utilities/di/main/tokens'
import { compareVersions } from '@utilities/strings/main'
import { BuildType, Lang, strToLang } from '../enums'
import type { IConfig, IMainConfigManager } from '../types'
import { ConfigRepository } from './repository'

/** Работа с конфигурацией программы. [main] */
export class Config implements IMainConfigManager {
	/** Явное имя сущности в мосте. */
	static readonly pubName = 'Config'
	/** Переменные среды. */
	@inject(ENV_TOKEN)
	private readonly env!: IEnv

	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: IDirs

	/** Система. */
	@inject(SYSTEM_TOKEN)
	private readonly system!: IMainSystem

	/** Репозиторий. */
	private readonly repository = new ConfigRepository()

	/** Автосохранение после изменения конфигурации. */
	private readonly autoSaver = createAutoSaver(() => this.save())

	/** Разрешено ли автосохранение (после загрузки конфигурации). */
	private autoSaveEnabled = false

	/** Стандартное значение конфигурации для `prod`. */
	private readonly prodDefault: IConfig = {
		version: di.resolve(APP_CONSTANTS_TOKEN).VERSION,
		buildType: this.env.isDev
			? BuildType.dev
			: BuildType.prod,
		lang: this.system.getUserLang() || Lang.en,
		initialPath: null,
		advancedMode: false,
		useMods: true,
		openWhatsNew: true,
		checkUpdates: true,
		optimizeUnpack: true
	}

	/** Стандартное значение конфигурации в `dev` режиме. */
	private readonly devDefault: IConfig = {
		...this.prodDefault,
		advancedMode: true,
		lang: strToLang(this.env.lang) || this.prodDefault.lang,
		initialPath: this.env.initialPath || this.prodDefault.initialPath,
		optimizeUnpack: !this.env.disableUnpackOptimizer,
		openWhatsNew: false
	}

	/** Стандартное значение конфигурации. */
	readonly default: IConfig = this.prodDefault.buildType === BuildType.dev
		? this.devDefault
		: this.prodDefault

	/** Программа в режиме разработки. */
	get isDev() {
		return this.object.buildType === BuildType.dev
	}

	/** Объект конфигурации. */
	accessor object!: IConfig

	constructor() {
		makeReactive(this, 'object', () => {
			if (this.autoSaveEnabled) {
				this.autoSaver.schedule()
			}
		})
		this.object = this.getConfig()
		this.autoSaveEnabled = true
	}

	/** Сохранить изменения в `config.json`. */
	async save() {
		this.autoSaver.cancel()
		await this.repository.save(this.object)
	}

	/** Получить конфигурацию. */
	get(): IConfig {
		return new Proxy({} as IConfig, {
			get: (_target, p) => this.object[p],
			set: (_target, p, newValue) => {
				this.set({ [p]: newValue })
				return true
			}
		})
	}

	/** Установить конфигурацию. */
	set(newObject: Partial<IConfig>) {
		this.object = this.sanitize({
			...this.object,
			...newObject
		})
	}

	async reset() {
		this.set(this.default)
	}

	/**
	 * Получить конфигурацию.
	 * @returns Объект конфигурации.
	 */
	private getConfig(): IConfig {
		try {
			return this.getFromJSON()
		} catch {
			return this.default
		}
	}

	/**
	 * Получить конфигурацию из JSON.
	 * @returns Объект конфигурации.
	 */
	private getFromJSON(): IConfig {
		const config = this.repository.readSync()

		if (!config || typeof config !== 'object') {
			return this.default
		}

		const versionComparison = compareVersions(config.version, this.default.version)

		if (versionComparison > 0) {
			return this.default
		}

		if (versionComparison < 0) {
			this.dirs.mainTemp.removeSync()
		}

		return this.sanitize(versionComparison < 0
			? this.convertToNewest(config)
			: config
		)
	}

	/**
	 * Привести конфигурацию к валидному виду.
	 * @param config Конфигурация.
	 * @returns Валидная конфигурация.
	 */
	private sanitize(config: Partial<IConfig>): IConfig {
		const fallback = this.default
		const bool = (value: unknown, defaultValue: boolean) => (
			typeof value === 'boolean' ? value : defaultValue
		)
		const trimmedInitialPath = typeof config.initialPath === 'string'
			? config.initialPath.trim()
			: ''
		const initialPath = trimmedInitialPath || null
		const buildType = config.buildType === BuildType.dev || config.buildType === BuildType.prod
			? config.buildType
			: fallback.buildType

		return {
			version: fallback.version,
			lang: strToLang(config.lang) ?? fallback.lang,
			buildType,
			initialPath,
			checkUpdates: bool(config.checkUpdates, fallback.checkUpdates),
			useMods: bool(config.useMods, fallback.useMods),
			openWhatsNew: bool(config.openWhatsNew, fallback.openWhatsNew),
			advancedMode: bool(config.advancedMode, fallback.advancedMode),
			optimizeUnpack: bool(config.optimizeUnpack, fallback.optimizeUnpack)
		}
	}

	/**
	 * Привести старую версию конфигурации к текущей.
	 * @param data Старая версия конфигурации.
	 * @returns Адаптированная конфигурация.
	 */
	private convertToNewest(data: IConfig): IConfig {
		const minConvertibleVersion = '1.0.0'

		return compareVersions(data.version, minConvertibleVersion) < 0
			? this.default
			: {
				...this.default,
				...data,
				version: this.default.version
			}
	}
}