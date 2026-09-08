import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { UPDATES_TOKEN } from '@utilities/di/main/tokens'
import type { IMainUpdates } from '../types'
import type { Updates } from './index'

/** Опубликовать {@link Updates}. */
export function publishUpdates() {
	let instance: IMainUpdates
	const getInstance = () => instance ??= di.resolve(UPDATES_TOKEN)
	const className = 'Updates'

	publishInstanceFunction(className, 'updateApp', getInstance)
}
