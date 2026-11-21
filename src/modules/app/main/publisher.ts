import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { APP_TOKEN } from '@utilities/di/main/tokens'
import type { IPublicApp } from '../types'
import { App } from './index'

/** Опубликовать {@link App}. */
export function publishApp() {
	let instance: IPublicApp
	const getInstance = () => instance ??= di.resolve(APP_TOKEN)
	publishInstanceFunction(App, 'reset', getInstance)
	publishInstanceFunction(App, 'toggleDevTools', getInstance)
	publishInstanceFunction(App, 'reload', getInstance)
	publishInstanceFunction(App, 'quit', getInstance)
}
