import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { UPDATES_TOKEN } from '@utilities/di/main/tokens'
import type { Updates } from './index'

export function publishUpdates() {
	let instance: Updates
	const getInstance = () => instance ??= di.resolve(UPDATES_TOKEN)
	const className = 'Updates'

	publishInstanceFunction(className, 'updateApp', getInstance)
}
