import { initMain, mainMethod } from '@bridge/renderer'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN } from '@utilities/di/renderer/tokens'
import { BuildType } from '../data/config/enums'
import type { App as MainApp } from './main'
import type { IRendererApp } from './types'

/** Приложение. [renderer] */
@initMain()
export class App implements IRendererApp {
	get isDev(): boolean {
		const config = di.resolve(CONFIG_TOKEN)
		return config.buildType === BuildType.dev
	}

	@mainMethod()
	reset!: MainApp['reset']

	@mainMethod()
	reload!: MainApp['reload']

	@mainMethod()
	quit!: MainApp['quit']

	@mainMethod()
	toggleDevTools!: MainApp['toggleDevTools']
}
