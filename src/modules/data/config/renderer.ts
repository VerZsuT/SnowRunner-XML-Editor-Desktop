import { initMain, mainObjectField } from '@bridge/renderer'
import { BuildType } from './enums'
import type { IConfig, IRendererConfigManager } from './types'

/** Работа с конфигурацией программы. [renderer] */
@initMain()
export class Config implements IRendererConfigManager {
	/** Явное имя сущности в мосте. */
	static readonly pubName = 'Config'
	@mainObjectField()
	private readonly object!: IConfig

	get isDev(): boolean {
		return this.object.buildType === BuildType.dev
	}

	get(): IConfig {
		return this.object
	}
}
