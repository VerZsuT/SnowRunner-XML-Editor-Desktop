import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { APP_TOKEN } from '@utilities/di/main/tokens'
import type { IPublicApp } from '../types'
import type { App } from './index'

/** Опубликовать {@link App}. */
export function publishApp() {
	let instance: IPublicApp
	const getInstance = () => instance ??= di.resolve(APP_TOKEN)
	const className = 'App'

	publishInstanceFunction(className, 'reset', getInstance)
	publishInstanceFunction(className, 'toggleDevTools', getInstance)
	publishInstanceFunction(className, 'reload', getInstance)
	publishInstanceFunction(className, 'quit', getInstance)
}
