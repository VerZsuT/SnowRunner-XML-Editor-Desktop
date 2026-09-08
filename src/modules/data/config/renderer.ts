import { initMain, mainObjectField } from '@bridge/renderer'
import { BuildType } from './enums'
import type { IConfig, IRendererConfigManager } from './types'

/** Работа с конфигурацией программы. [renderer] */
@initMain()
export class Config implements IRendererConfigManager {
	@mainObjectField()
	private readonly object!: IConfig

	get isDev(): boolean {
		return this.object.buildType === BuildType.dev
	}

	get() {
		return new Proxy({} as IConfig, {
			get: (_target, p) => this.object[p],
			set: (_target, p, newValue) => {
				this.object[p] = newValue
				return true
			}
		})
	}
}
